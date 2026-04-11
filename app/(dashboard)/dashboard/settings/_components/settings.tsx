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
    <div className="min-h-screen p-8">
      <SettingsHeader />

      <div className="flex gap-12">
        <SettingsNav active={active} setActive={setActive} />

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          <section className="mb-12">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                Imported Repositories
              </h2>
              <Button className="rounded-lg bg-orange-600 text-white hover:bg-orange-700">
                + Add Repository
              </Button>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-4">
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
          <section className="mb-12 max-w-2xl">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">
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
          <section className="mb-12">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">
              Digest Frequency
            </h2>

            <div className="grid max-w-3xl grid-cols-3 gap-4">
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

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button variant="ghost" className="text-muted-foreground">
              Discard Changes
            </Button>
            <Button className="rounded-lg bg-orange-600 px-6 text-white hover:bg-orange-700">
              Save Settings
            </Button>
          </div>

          <Separator className="my-12" />

          <SettingsFooter />
        </div>
      </div>
    </div>
  )
}
