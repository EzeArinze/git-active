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
