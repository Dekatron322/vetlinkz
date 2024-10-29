"use client"
import Link from "next/link"
import React, { useState } from "react"
import { FourthLink, Links, SecondLinks, Thirdinks } from "./Links"

import clsx from "clsx"
import { LogoIcon } from "./Icons"

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={clsx("sidebar flex h-full flex-col justify-between border-0 border-[#424343] max-sm:hidden")}
    >
      <div className="h-full justify-between border-0 border-red-700 lg:mt-6 lg:h-auto lg:space-y-4">
        <div className="border-0 border-white px-7 transition-opacity lg:block">
          <Link href="/">
            {" "}
            <LogoIcon />
          </Link>
        </div>

        <div className="h-full border-0 border-primary-700 px-3 lg:h-auto lg:space-y-1 ">
          <p className="clash-font pl-2">Explore</p>
          <Links />
          <p className="clash-font pl-2">Manage Cases</p>
          <SecondLinks />

          <p className="clash-font pl-2">Support</p>
          <Thirdinks />

          <p className="clash-font pl-2">Account</p>
          <FourthLink />
        </div>
      </div>
    </div>
  )
}

export default SideBar
