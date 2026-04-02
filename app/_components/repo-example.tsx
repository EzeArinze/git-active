
import { Button } from '@/components/ui/button'
import { Book, CheckCircle2, Circle, Folder, Globe, LocateFixed, Search } from 'lucide-react'
import React from 'react'

export default function RepoExample() {
  return (
   <section className="mx-auto mt-24 w-full px-6">
          <div className="rounded-[2.5rem] bg-secondary p-8 sm:p-12 shadow-sm border border-border/50">
            <div className="text-center">
              <h2 className="text-[2rem] font-serif font-medium text-foreground tracking-tight">Select Repositories</h2>
              <p className="mt-2 text-[0.95rem] text-muted-foreground">
                Choose the projects you want Terra to analyze for your first dashboard.
              </p>
            </div>

            <div className="relative mx-auto mt-8 max-w-104">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search your repositories..."
                readOnly
                className="w-full rounded-full border border-border/80 bg-background py-3 pl-11 pr-4 text-sm text-foreground shadow-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="mt-10 grid gap-3.5 sm:grid-cols-2">
              {/* Selected Repo 1 */}
              <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-primary/20 bg-primary/6 p-3.5 transition-colors hover:bg-primary/10">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className="size-5 fill-primary text-secondary" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.9rem] font-semibold text-foreground">terra-design-system</span>
                    <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-primary"></span>
                      TypeScript &bull; Updated 2h ago
                    </span>
                  </div>
                </div>
                <Folder className="mr-1 size-4.5 text-muted-foreground" />
              </div>

              {/* Selected Repo 2 */}
              <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-primary/20 bg-primary/6 p-3.5 transition-colors hover:bg-primary/10">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center justify-center">
                    <CheckCircle2 className="size-5 fill-primary text-secondary" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.9rem] font-semibold text-foreground">intelligence-api-node</span>
                    <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-green-500"></span>
                      JavaScript &bull; Updated 1d ago
                    </span>
                  </div>
                </div>
                <LocateFixed className="mr-1 size-4.5 text-muted-foreground" />
              </div>

              {/* Unselected Repo 1 */}
              <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-3.5 transition-all hover:border-border/80 hover:shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center justify-center">
                    <Circle className="size-5 text-muted-foreground/30" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.9rem] font-semibold text-foreground">marketing-site-v2</span>
                    <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-yellow-500"></span>
                      HTML &bull; Updated 5d ago
                    </span>
                  </div>
                </div>
                <Globe className="mr-1 size-4.5 text-muted-foreground" />
              </div>

              {/* Unselected Repo 2 */}
              <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background p-3.5 transition-all hover:border-border/80 hover:shadow-sm">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center justify-center">
                    <Circle className="size-5 text-muted-foreground/30" strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[0.9rem] font-semibold text-foreground">documentation-vault</span>
                    <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-blue-500"></span>
                      Markdown &bull; Updated 3w ago
                    </span>
                  </div>
                </div>
                <Book className="mr-1 size-4.5 text-muted-foreground" />
              </div>
            </div>

            <div className="mx-2 mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
              <span className="text-[0.75rem] font-semibold text-muted-foreground/90">
                2 repositories selected for analysis
              </span>
              <div className="flex w-full gap-3 sm:w-auto">
                <Button variant="outline" className="h-10 flex-1 rounded-full px-7 bg-background/50 hover:bg-background/80 text-[0.9rem] text-foreground sm:flex-none">
                  Back
                </Button>
                <Button className="h-10 flex-1 rounded-full px-7 bg-primary text-[0.9rem] font-medium hover:bg-primary/90 text-primary-foreground sm:flex-none">
                  Continue to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </section>
  )
}
