import NotificationHeader from "./_components/notification-header"
import NotificationStats from "./_components/notification-stats"
import NotificationFeed from "./_components/notification-feed"
import NotificationAds from "./_components/notification-ads"

export default function NotificationPageRoute() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <NotificationHeader />
      <NotificationStats />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold sm:text-xl">Critical Feed</h2>
        <button className="text-sm text-orange-500 hover:underline">
          Mark all as read
        </button>
      </div>
      <NotificationFeed />
      <NotificationAds />
    </div>
  )
}
