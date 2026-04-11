import NotificationHeader from "./_components/notification-header"
import NotificationStats from "./_components/notification-stats"
import NotificationFeed from "./_components/notification-feed"
import NotificationAds from "./_components/notification-ads"

export default function NotificationPageRoute() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      <NotificationHeader />
      <NotificationStats />

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Critical Feed</h2>
        <button className="text-sm text-orange-500">Mark all as read</button>
      </div>

      <NotificationFeed />

      <NotificationAds />
    </div>
  )
}
