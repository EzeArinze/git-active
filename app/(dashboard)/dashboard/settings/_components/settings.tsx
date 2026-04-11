"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Mail, Bell, Calendar, CalendarDays, CalendarRange } from "lucide-react"
import SettingsNav from "./settings-nav"
import SettingsRepoCard from "./settings-repo-card"
import SettingsNotificationItem from "./settings-notification-item"
import SettingsFrequencyCard from "./settings-frequency-card"
import SettingsHeader from "./settings-header"
import SettingsFooter from "./settings-footer"

export default function Settings() {
  const [active, setActive] = useState("repositories")
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(false)
  const [freq, setFreq] = useState("daily")

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <SettingsHeader />

      <div className="flex flex-col gap-6 md:flex-row md:gap-8">
        {/* Sub-sidebar – becomes horizontal scroll on mobile */}
        <div className="w-full md:w-56">
          <SettingsNav active={active} setActive={setActive} />
        </div>

        {/* Right content – full width on mobile */}
        <div className="flex-1">
          {/* Repositories section */}
          <section className="mb-10">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                Imported Repositories
              </h2>
              <Button className="rounded-lg bg-orange-600 text-white hover:bg-orange-700">
                + Add Repository
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SettingsRepoCard
                name="sahara-ui-kit"
                time="Last synced 2h ago"
              />
              <SettingsRepoCard
                name="core-engine-v2"
                time="Last synced 5m ago"
              />
              <SettingsRepoCard name="docs-portal" time="Last synced 1d ago" />
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="mb-10">
            <h2 className="mb-5 text-xl font-semibold tracking-tight sm:text-2xl">
              Notification Preferences
            </h2>
            <div className="space-y-4">
              <SettingsNotificationItem
                icon={Mail}
                title="Email Notifications"
                desc="Receive summaries and critical alerts via email."
                checked={email}
                onChange={setEmail}
              />
              <SettingsNotificationItem
                icon={Bell}
                title="Push Notifications"
                desc="Desktop alerts for real-time repository updates."
                checked={push}
                onChange={setPush}
              />
            </div>
          </section>

          {/* Digest Frequency */}
          <section className="mb-10">
            <h2 className="mb-5 text-xl font-semibold tracking-tight sm:text-2xl">
              Digest Frequency
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <SettingsFrequencyCard
                icon={Calendar}
                title="Daily"
                desc="Sent every morning at 8:00 AM"
                active={freq === "daily"}
                onClick={() => setFreq("daily")}
              />
              <SettingsFrequencyCard
                icon={CalendarDays}
                title="Weekly"
                desc="Every Monday morning overview"
                active={freq === "weekly"}
                onClick={() => setFreq("weekly")}
              />
              <SettingsFrequencyCard
                icon={CalendarRange}
                title="Monthly"
                desc="Enterprise only"
                disabled
              />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button variant="ghost" className="text-muted-foreground">
              Discard Changes
            </Button>
            <Button className="rounded-lg bg-orange-600 px-6 text-white hover:bg-orange-700">
              Save Settings
            </Button>
          </div>

          <Separator className="my-8" />
          <SettingsFooter />
        </div>
      </div>
    </div>
  )
}
