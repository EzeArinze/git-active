// modules/github/webhook-handler.ts

import { db } from "@/lib/server/db"
import { activities } from "@/lib/server/db/schema"
import { githubApp } from "../github-app-instance"
import { logIfMissing } from "../utils/log-missing"
import { buildActivity } from "../utils/build-activity"
import { getActor, getActorFromCommit } from "../utils/get-actor"
// import type {
//   PushEvent,
//   PullRequestEvent,
//   IssuesEvent,
// } from "@octokit/webhooks-types"

let initialized = false

if (!initialized) {
  initialized = true

  async function storeActivity(data: {
    githubRepoId: number
    type: string
    actor: string
    message?: string
    url?: string
    externalId: string
  }) {
    await db
      .insert(activities)
      .values({
        githubRepoId: data.githubRepoId,
        type: data.type,
        actor: data.actor,
        message: data.message,
        url: data.url,
        externalId: data.externalId,
      })
      .onConflictDoNothing()
  }

  githubApp.webhooks.on("push", async ({ payload }) => {
    const repo = payload.repository

    logIfMissing("repository", repo)

    if (!repo) return

    const pushActivities = payload.commits.map((commit) => {
      return buildActivity({
        githubRepoId: repo.id,
        externalId: commit.id,
        type: "push",
        actor: getActorFromCommit(commit.author),
        message: commit.message,
        url: commit.url,
      })
    })

    if (pushActivities.length > 0) {
      await db.insert(activities).values(pushActivities).onConflictDoNothing()
    }
  })

  githubApp.webhooks.on("issues", async ({ payload }) => {
    const issue = payload.issue

    logIfMissing("issue", issue)

    if (!issue) return

    const activity = buildActivity({
      githubRepoId: payload.repository.id,
      externalId: String(issue.id),
      type: "issue",
      actor: getActor({ login: issue.user?.login, type: issue.user?.type }),
      message: `${payload.action} issue: ${issue.title}`,
      url: issue.html_url,
    })

    await storeActivity(activity)
  })

  githubApp.webhooks.on("pull_request", async ({ payload }) => {
    const pr = payload.pull_request

    logIfMissing("pull_request", pr)

    if (!pr) return

    const activity = buildActivity({
      githubRepoId: pr.base.repo.id,
      type: "pull_request",
      actor: getActor({ login: pr.user?.login, type: pr.user?.type }),
      message: `${payload.action} PR: ${pr.title}`,
      url: pr.html_url,
      externalId: String(pr.id),
    })

    await storeActivity(activity)
  })

  githubApp.webhooks.onError((error) => {
    console.error("Webhook error:", error)
  })
}

// async function handlePullRequestEvent(payload: PullRequestEvent) {
//   const pr = payload.pull_request
//   const action = payload.action

//   await storeActivity({
//     githubRepoId: pr.base.repo.id,
//     type: "pull_request",
//     actor: pr.user.login,
//     message: `${action} PR: ${pr.title}`,
//     url: pr.html_url,
//   })
// }

// async function handleIssueEvent(payload: IssuesEvent) {
//   const issue = payload.issue
//   const action = payload.action

//   await storeActivity({
//     githubRepoId: issue.id,
//     type: "issue",
//     actor: issue.user.login,
//     message: `${action} issue: ${issue.title}`,
//     url: issue.html_url,
//   })
// }

// export async function handleGitHubEvent(event: string, payload: unknown) {
//   switch (event) {
//     case "push":
//       return handlePushEvent(payload as PushEvent)

//     case "pull_request":
//       return handlePullRequestEvent(payload as PullRequestEvent)

//     case "issues":
//       return handleIssueEvent(payload as IssuesEvent)

//     default:
//       return
//   }
// }

// async function handlePushEvent(payload: PushEvent) {
//   const repo = payload.repository
//   const commits = payload.commits

//   for (const commit of commits) {
//     await storeActivity({
//       githubRepoId: repo.id,
//       type: "push",
//       actor: commit.author?.name || "unknown",
//       message: commit.message,
//       url: commit.url,
//     })
//   }
// }
