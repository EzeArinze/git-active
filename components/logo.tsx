import { cn } from "@/lib/utils"
import LogoImage from "@/public/logo.svg"
import Image from "next/image"

function Logo({className}:{className?:string}) {
  return (
    <div className={cn("flex size-10 items-center justify-center rounded-full border border-border bg-secondary shadow-sm",className)}>
      <Image src={LogoImage} alt="app-logo" />
    </div>
  )
}

export default Logo
