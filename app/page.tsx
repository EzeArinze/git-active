import Header from "@/components/header"
import { HeroSection } from "./_components/hero"
import Footer from "./_components/footer"
import RepoExample from "./_components/repo-example"

export default function Page() {
  return (

    <div className="flex min-h-svh flex-col selection:bg-primary/20">
      <Header/>

    <main className="flex-1 pb-16 max-w-7xl mx-auto">
      <HeroSection/>
      <RepoExample/>
      <Footer/>
    </main>
    </div>
  )
}
