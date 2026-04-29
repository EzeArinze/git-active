import { withWorkflow } from "workflow/next"

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
}

export default withWorkflow(nextConfig)
