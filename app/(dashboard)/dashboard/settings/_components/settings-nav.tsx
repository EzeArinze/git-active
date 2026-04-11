// import { cn } from "@/lib/utils"
// import { Dispatch, SetStateAction } from "react"

// interface iAppProps {
//   active: string
//   setActive: Dispatch<SetStateAction<string>>
// }

// function SettingsNav({ active, setActive }: iAppProps) {
//   const items = [
//     { id: "repositories", label: "Repositories" },
//     { id: "notifications", label: "Notifications" },
//     { id: "digest", label: "Digest Frequency" },
//     { id: "security", label: "Security" },
//   ]

//   return (
//     <div className="w-56 space-y-1">
//       {items.map((item) => (
//         <button
//           key={item.id}
//           onClick={() => setActive(item.id)}
//           className={cn(
//             "w-full rounded-lg px-3 py-2 text-left text-sm transition",
//             active === item.id
//               ? "font-medium text-orange-700"
//               : "text-muted-foreground"
//           )}
//         >
//           {item.label}
//         </button>
//       ))}
//     </div>
//   )
// }

// export default SettingsNav

import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"

interface iAppProps {
  active: string
  setActive: Dispatch<SetStateAction<string>>
}

export default function SettingsNav({ active, setActive }: iAppProps) {
  const items = [
    { id: "repositories", label: "Repositories" },
    { id: "notifications", label: "Notifications" },
    { id: "digest", label: "Digest Frequency" },
    { id: "security", label: "Security" },
  ]

  return (
    <nav className="w-full overflow-x-auto">
      <div className="flex flex-row gap-1 whitespace-nowrap md:flex-col md:space-y-1 md:whitespace-normal">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={cn(
              "rounded-lg px-3 py-2 text-left text-sm transition",
              "hover:bg-muted",
              active === item.id
                ? "font-medium text-orange-700"
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
