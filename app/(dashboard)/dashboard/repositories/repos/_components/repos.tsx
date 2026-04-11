import PromoCard from "./promo-card"
import ReposCard from "./repos-card"

const repositories = [
  {
    name: "core-engine-v4",
    desc: "Main processing backbone for sahara-intel-services.",
    status: "ACTIVE",
    stats: ["142 COMMITS", "12 PRS", "4 ISSUES"],
    updated: "Updated 2h ago",
  },
  {
    name: "legacy-auth-module",
    desc: "Security framework for vintage user environments.",
    status: "AT RISK",
    stats: ["2 COMMITS", "0 PRS", "28 ISSUES"],
    updated: "Updated 14d ago",
  },
  {
    name: "docs-portal-static",
    desc: "Generated documentation for public API endpoints.",
    status: "INACTIVE",
    stats: ["0 COMMITS", "1 PRS", "0 ISSUES"],
    updated: "Updated 2mo ago",
  },
  {
    name: "infra-as-code-aws",
    desc: "Terraform modules for cloud orchestration.",
    status: "ACTIVE",
    stats: ["89 COMMITS", "5 PRS", "2 ISSUES"],
    updated: "Updated 10m ago",
  },
  {
    name: "ml-model-registry",
    desc: "Versioned AI models for Sahara inference engines.",
    status: "ACTIVE",
    stats: ["31 COMMITS", "3 PRS", "1 ISSUES"],
    updated: "Updated 1d ago",
  },
]

function Repos() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {/* Card */}
      {repositories.map((repo, i) => (
        <ReposCard repo={repo} key={i} />
      ))}

      <PromoCard />
    </div>
  )
}

export default Repos
