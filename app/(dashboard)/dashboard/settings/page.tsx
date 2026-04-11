"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Folder,
  Mail,
  Bell,
  Calendar,
  CalendarDays,
  CalendarRange,
} from "lucide-react"

function SettingsNav({ active, setActive }: any) {
  const items = [
    { id: "repositories", label: "Repositories" },
    { id: "notifications", label: "Notifications" },
    { id: "digest", label: "Digest Frequency" },
    { id: "security", label: "Security" },
  ]

  return (
    <div className="w-56 space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={cn(
            "w-full rounded-lg px-3 py-2 text-left text-sm transition",
            active === item.id
              ? "font-medium text-orange-700"
              : "text-muted-foreground"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

function RepoCard({ name, time }: { name: string; time: string }) {
  return (
    <Card className="rounded-xl border-none shadow-none transition hover:opacity-90">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-200">
          <Folder className="h-5 w-5 text-orange-700" />
        </div>
        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function NotificationItem({ icon: Icon, title, desc, checked, onChange }: any) {
  return (
    <Card className="rounded-xl border-none shadow-sm">
      <CardContent className="flex items-center justify-between p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100">
            <Icon className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{title}</p>
            <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
          </div>
        </div>
        <Switch checked={checked} onCheckedChange={onChange} />
      </CardContent>
    </Card>
  )
}

function FrequencyCard({
  icon: Icon,
  title,
  desc,
  active,
  disabled,
  onClick,
}: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full rounded-2xl text-left transition",
        active ? "border-2 border-orange-500" : "border border-transparent",
        disabled && "cursor-not-allowed opacity-50",
        "hover:border-orange-300"
      )}
    >
      <div className="flex flex-col gap-3 p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
          <Icon className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
    </button>
  )
}

export default function SettingsPage() {
  const [active, setActive] = useState("repositories")
  const [email, setEmail] = useState(true)
  const [push, setPush] = useState(false)
  const [freq, setFreq] = useState("daily")

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Refine your intelligence engine and notification preferences.
        </p>
      </div>

      <div className="flex gap-12">
        {/* LEFT NAV */}
        <SettingsNav active={active} setActive={setActive} />

        {/* RIGHT CONTENT */}
        <div className="flex-1">
          {/* Imported Repositories */}
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
              <RepoCard name="sahara-ui-kit" time="Last synced 2h ago" />
              <RepoCard name="core-engine-v2" time="Last synced 5m ago" />
              <RepoCard name="docs-portal" time="Last synced 1d ago" />
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="mb-12 max-w-2xl">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <NotificationItem
                icon={Mail}
                title="Email Notifications"
                desc="Receive summaries and critical alerts via email."
                checked={email}
                onChange={setEmail}
              />

              <NotificationItem
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
              <FrequencyCard
                icon={Calendar}
                title="Daily"
                desc="Sent every morning at 8:00 AM"
                active={freq === "daily"}
                onClick={() => setFreq("daily")}
              />

              <FrequencyCard
                icon={CalendarDays}
                title="Weekly"
                desc="Every Monday morning overview"
                active={freq === "weekly"}
                onClick={() => setFreq("weekly")}
              />

              <FrequencyCard
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

          {/* Footer */}
          <div className="flex items-center justify-between text-sm">
            <div className="max-w-md">
              <p className="font-medium">Need Help?</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Our intelligence specialist team is available 24/7 to help you
                configure your Sahara workspace.
              </p>
            </div>

            <div className="flex gap-6 text-sm text-orange-600">
              <button className="hover:underline">Documentation</button>
              <button className="hover:underline">Contact Support</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
