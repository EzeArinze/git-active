"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Octokit } from "octokit"
import { githubApp } from "./github-app-instance"

type getOctokitForUserType = {
  userId: string
}

export const getOctokitForUser = async ({ userId }: getOctokitForUserType) => {
  const { accessToken } = await auth.api.getAccessToken({
    headers: await headers(),
    body: {
      providerId: "github",
      userId,
    },
  })

  if (!accessToken) {
    throw new Error("No access Token or invalid access token")
  }

  return new Octokit({
    auth: accessToken,
  })
}

export async function getGitHubAppOctokit(installationId: number) {
  const octokit = await githubApp.getInstallationOctokit(installationId)
  return octokit
}

export async function getInstallationMetadata(installationId: number) {
  const { data } = await githubApp.octokit.rest.apps.getInstallation({
    installation_id: installationId,
  })

  const account = data.account

  const accountLogin =
    account && "login" in account
      ? account.login
      : account && "slug" in account
        ? account.slug
        : undefined

  const accountType = account && "type" in account ? account.type : undefined

  return {
    accountLogin,
    accountType,
  }
}

export async function getInstallationFallback(installationId: number) {
  const octokit = await githubApp.getInstallationOctokit(installationId)

  const repos = await octokit.rest.apps.listReposAccessibleToInstallation({
    per_page: 1,
  })

  return repos.data.repositories[0]?.owner?.login
}
