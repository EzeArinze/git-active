"use server"
import { githubApp } from "../github-app-instance"

export async function installGitHubApp() {
  //  const
}

export async function getOctokitForUser(installationId: number) {
  return githubApp.getInstallationOctokit(installationId)
}
