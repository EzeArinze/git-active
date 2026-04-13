"use server"
import { githubApp } from "../github"

export async function getOctokitForUser(installationId: number) {
  return githubApp.getInstallationOctokit(installationId)
}
