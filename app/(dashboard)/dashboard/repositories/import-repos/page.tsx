import ImportRepoHeader from "./_components/import-repo-header"
import ImportRepoSection from "./_components/import-repo-section"
import InformationComponent from "./_components/information"

function ImportReposRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <ImportRepoHeader />

      {/* Repo Card */}
      <ImportRepoSection />

      {/* Bottom Features */}
      <InformationComponent />

      {/* Footer note */}
      <div className="text-center text-xs text-muted-foreground">
        Git Active © 2024 • BUILT FOR CLARITY
      </div>
    </div>
  )
}

export default ImportReposRoute
