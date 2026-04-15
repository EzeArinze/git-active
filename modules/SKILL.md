# 🧠 Skill: Import GitHub Repository (User → App → DB) — PRODUCTION GRADE

## 🎯 Goal

Enable users to select a repository from fetched GitHub repos and import it into the system for **monitoring, analytics, and alerts**.

This flow MUST be:

* secure (never trust client data)
* idempotent (no duplicates)
* scalable (supports orgs & many repos)
* aligned with GitHub App + OAuth hybrid model

---

# 🧩 1. Architecture Overview

## Layers

### 1. OAuth Layer (Discovery)

* Fetch user repos (already implemented)

### 2. GitHub App Layer (Authorization)

* Verify installation
* Verify repo access

### 3. App Layer (Database)

* Store only **selected repos to monitor**

---

# 🗄️ 2. Database Schema (Production Safe)

## Table: `repositories`

```ts
{
  id: string (uuid)
  userId: string
  githubRepoId: number
  name: string
  fullName: string
  owner: string
  private: boolean
  url: string
  defaultBranch: string
  installationId: number
  createdAt: Date
}
```

### 🔒 Constraints

```ts
@@unique([userId, githubRepoId])
```

---

## Table: `github_installations`

```ts
{
  id: string
  userId: string
  installationId: number
  accountLogin: string
  createdAt: Date
}
```

---

## Table: `alerts` (future)

```ts
{
  id: string
  userId: string
  repoId: string
  type: string
  message: string
  createdAt: Date
}
```

---

# 🔌 3. Import Flow (Production)

## 🚨 RULE: NEVER TRUST FRONTEND DATA

Frontend repo object is only a **reference**, not truth.

---

## Step 1: Validate Repo From GitHub

```ts
const octokitUser = await getOctokitForUser({ userId })

const githubRepo = await octokitUser.rest.repos.get({
  owner: repo.owner,
  repo: repo.name,
})
```

---

## Step 2: Check if Already Imported

```ts
const existing = await db.repositories.findFirst({
  where: {
    githubRepoId: githubRepo.data.id,
    userId,
  },
})

if (existing) {
  return { status: "already_imported" }
}
```

---

## Step 3: Ensure GitHub App Installation

```ts
const installation = await db.github_installations.findFirst({
  where: {
    userId,
    accountLogin: githubRepo.data.owner.login,
  },
})

if (!installation) {
  return {
    status: "needs_installation",
    redirectUrl: "https://github.com/apps/YOUR_APP/installations/new",
  }
}
```

---

## Step 4: Verify Repo Access via Installation

```ts
const appOctokit = await app.getInstallationOctokit(
  installation.installationId
)

const { data } =
  await appOctokit.rest.apps.listReposAccessibleToInstallation()

const hasAccess = data.repositories.some(
  (r) => r.id === githubRepo.data.id
)

if (!hasAccess) {
  return {
    status: "needs_access_update",
    redirectUrl: `https://github.com/apps/YOUR_APP/installations/${installation.installationId}`,
  }
}
```

---

## Step 5: Save Using Transaction

```ts
await db.$transaction(async (tx) => {
  await tx.repositories.create({
    data: {
      userId,
      githubRepoId: githubRepo.data.id,
      name: githubRepo.data.name,
      fullName: githubRepo.data.full_name,
      owner: githubRepo.data.owner.login,
      private: githubRepo.data.private,
      url: githubRepo.data.html_url,
      defaultBranch: githubRepo.data.default_branch || "main",
      installationId: installation.installationId,
    },
  })
})
```

---

## Step 6: Trigger Intelligence Engine (CORE FEATURE)

After import, immediately trigger:

```ts
await triggerInitialSync({
  repoId: githubRepo.data.id,
  installationId: installation.installationId,
})
```

This should:

* fetch commits
* fetch PRs
* calculate metrics
* generate initial alerts

---

## Step 7: Return Response

```ts
return { status: "success" }
```

---

# 🔄 4. Full Production Function

```ts
export async function importRepo(userId: string, repo: any) {
  try {
    // 1. validate repo from GitHub
    const octokitUser = await getOctokitForUser({ userId })

    const { data: githubRepo } = await octokitUser.rest.repos.get({
      owner: repo.owner,
      repo: repo.name,
    })

    // 2. check existing
    const existing = await db.repositories.findFirst({
      where: {
        githubRepoId: githubRepo.id,
        userId,
      },
    })

    if (existing) return { status: "already_imported" }

    // 3. installation
    const installation = await db.github_installations.findFirst({
      where: {
        userId,
        accountLogin: githubRepo.owner.login,
      },
    })

    if (!installation) {
      return {
        status: "needs_installation",
        redirectUrl:
          "https://github.com/apps/YOUR_APP/installations/new",
      }
    }

    // 4. verify access
    const appOctokit = await app.getInstallationOctokit(
      installation.installationId
    )

    const { data } =
      await appOctokit.rest.apps.listReposAccessibleToInstallation()

    const hasAccess = data.repositories.some(
      (r) => r.id === githubRepo.id
    )

    if (!hasAccess) {
      return {
        status: "needs_access_update",
        redirectUrl: `https://github.com/apps/YOUR_APP/installations/${installation.installationId}`,
      }
    }

    // 5. transaction save
    await db.$transaction(async (tx) => {
      await tx.repositories.create({
        data: {
          userId,
          githubRepoId: githubRepo.id,
          name: githubRepo.name,
          fullName: githubRepo.full_name,
          owner: githubRepo.owner.login,
          private: githubRepo.private,
          url: githubRepo.html_url,
          defaultBranch: githubRepo.default_branch,
          installationId: installation.installationId,
        },
      })
    })

    // 6. trigger intelligence engine
    await triggerInitialSync({
      repoId: githubRepo.id,
      installationId: installation.installationId,
    })

    return { status: "success" }
  } catch (error) {
    return {
      status: "error",
      message: "Failed to import repository",
    }
  }
}
```

---

# 🎨 5. UI States

```ts
"success"
"already_imported"
"needs_installation"
"needs_access_update"
"error"
```

---

# 🚀 6. Intelligence Engine Hook (Core of Your App)

```ts
async function triggerInitialSync({ repoId, installationId }) {
  // fetch commits
  // fetch pull requests
  // compute activity metrics
  // generate alerts (stale PRs, inactivity, spikes)
}
```

---

# 🧠 Summary

```text
Fetch repos (OAuth)
        ↓
User selects repo
        ↓
Validate repo from GitHub
        ↓
Check installation
        ↓
Verify access
        ↓
Store in DB (transaction)
        ↓
Trigger intelligence engine
        ↓
Start monitoring & alerts
```

---

# ✅ Outcome

This implementation is:

* secure (no client trust)
* scalable (org + multi-repo)
* production-grade (transactions + constraints)
* aligned with real SaaS architecture
