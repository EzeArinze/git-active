"use server"

import { Octokit } from "octokit"
import { githubApp } from "./github-app-instance"

type getOctokitForUserType = {
  accessToken: string
}

export const getOctokitForUser = async ({
  accessToken,
}: getOctokitForUserType) => {
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
