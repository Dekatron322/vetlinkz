"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  CasesIcon,
  ChatIcon,
  DashboardIcon,
  EstatesIcon,
  GuidelineIcon,
  HomeIcon,
  LogoutsIcon,
  PropertyIcon,
  SavedCasesIcon,
  SettingsIcon,
  SupportIcon,
} from "./Icons"

const links = [
  { name: "Cases", href: "/dashboard", icon: DashboardIcon },
  { name: "Doctors", href: "/doctors", icon: EstatesIcon },
  { name: "Upload Cases", href: "/upload-cases", icon: HomeIcon },
  { name: "Recently Viewed", href: "/recently-viewed", icon: ChatIcon },
  { name: "Notifications", href: "/notifications", icon: PropertyIcon },
]

const secondlinks = [
  { name: "My Cases", href: "/my-cases", icon: CasesIcon },
  { name: "Saved Cases", href: "/bookmarked-cases", icon: SavedCasesIcon },
]

const thirdlinks = [
  { name: "Guidlines And Best Practices", href: "/guidelines", icon: GuidelineIcon },
  { name: "Support And Help", href: "/support", icon: SupportIcon },
]

const fourthlinks = [
  { name: "Account Settings", href: "/account-settings", icon: SettingsIcon },
  { name: "Log Out", href: "/log-out", icon: LogoutsIcon },
]

interface LinksProps {
  isCollapsed: boolean
}

export function Links() {
  const pathname = usePathname()
  const [expandedLink, setExpandedLink] = useState<string | null>(null)

  const handleExpand = (linkName: string) => {
    setExpandedLink(expandedLink === linkName ? null : linkName)
  }

  return (
    <div className="flex  flex-col border-black pb-5">
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        const isExpanded = expandedLink === link.name

        return (
          <div key={link.name}>
            <div
              className={clsx("dashboard-style cursor-pointer ", {
                "active-dashboard bg-[#F1F1F1]": isActive,
              })}
            >
              <Link href={link.href}>
                <div className="flex items-center gap-2 pl-2">
                  <LinkIcon isActive={isActive} />
                  <p className={clsx("clash-font text-base font-semibold transition-opacity duration-500")}>
                    {link.name}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function SecondLinks() {
  const pathname = usePathname()
  return (
    <div className="flex  flex-col border-black pb-5">
      {secondlinks.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("dashboard-style", {
              "active-dashboard": isActive,
            })}
          >
            <div className="flex items-center gap-2 pl-2">
              <LinkIcon isActive={isActive} />
              <p className={clsx("clash-font text-base font-semibold transition-opacity duration-500")}>{link.name}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export function Thirdinks() {
  const pathname = usePathname()
  return (
    <div className="flex  flex-col border-black pb-5">
      {thirdlinks.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("dashboard-style", {
              "active-dashboard": isActive,
            })}
          >
            <div className="flex items-center gap-2 pl-2">
              <LinkIcon isActive={isActive} />
              <p className={clsx("clash-font text-base font-semibold transition-opacity duration-500")}>{link.name}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export function FourthLink() {
  const pathname = usePathname()
  return (
    <div className="flex  flex-col border-black pb-5">
      {fourthlinks.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("dashboard-style", {
              "active-dashboard": isActive,
            })}
          >
            <div className="flex items-center gap-2 pl-2">
              <LinkIcon isActive={isActive} />
              <p className={clsx("clash-font text-base font-semibold transition-opacity duration-500")}>{link.name}</p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
