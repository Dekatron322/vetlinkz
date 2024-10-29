"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useRef, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { Skeleton } from "@mui/material"
import { motion } from "framer-motion"
import axios from "axios"
import { usePathname, useRouter } from "next/navigation"

interface UserDetails {
  id: number
  username: string
  email: string
  phone_number: string
  address: string
  account_type: string
}

const DashboardNav = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [loading, setLoading] = useState(true)
  setTimeout(() => setLoading(false), 3000)
  const [searchText, setSearchText] = useState("")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const handleCancelSearch = () => {
    setSearchText("")
  }

  const dropdownRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchUserDetails()
    setMounted(true)
  }, [])

  const fetchUserDetails = async () => {
    try {
      const userId = localStorage.getItem("id")
      if (userId) {
        const response = await axios.get<UserDetails>(`https://vet.fyber.site/app_user/get-user-detail/${userId}/`)
        if (response.data) {
          setUserDetails(response.data)
        } else {
          setError("User details not found.")
          router.push("/signin")
        }
      } else {
        setError("User ID not found.")
        router.push("/signin")
      }
    } catch (error) {
      setError("Failed to load user details.")
      console.error("Error fetching user details:", error)
      router.push("/signin")
    } finally {
      setLoading(false)
    }
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsNavOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isDropdownOpen, isNavOpen])

  if (!mounted) {
    return null
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const getNavLinkClass = (path: string) => {
    return pathname === path ? "text-[#000000]" : "text-black"
  }

  const getNavImageSrc = (path: string, defaultSrc: string, activeSrc: string) => {
    return pathname === path ? activeSrc : defaultSrc
  }

  return (
    <>
      <motion.nav
        className="body hidden border-b px-16 py-4 md:block"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <div className="flexBetween">
          <div className="flex content-center gap-32">
            <div className="content-center">
              <p className="clash-font text-xl font-black text-black">
                Welcome Back. Dr. {userDetails ? <>{userDetails.username}</> : <></>}
              </p>
              <p className="clash-font text-sm font-medium text-[#00000080]">
                Best Veterinary Platform to View and Discuss important cases
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex content-center items-center justify-center gap-5">
              <Link
                href="/upload-cases"
                className="clash-font flex h-[42px] content-center items-center justify-center gap-2 rounded-lg bg-[#1B5EED] px-5 text-white"
              >
                Upload New Case
                <Image src="/AuthImages/Plus.svg" width={20} height={20} alt="avatar" />
              </Link>

              <div className="flex  items-center justify-center ">
                <Image src="/DashboardImages/BellSimple.svg" width={24} height={24} alt="avatar" />
              </div>
              <Link href="#" className="flex content-center items-center justify-center">
                <Image src="/DashboardImages/ic_round-account-circle.svg" width={32} height={32} alt="avatar" />
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>
      <nav className="block border-b  px-16 py-4 max-md:px-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="content-center">
            <Image src="/AuthImages/collapsed.svg" width={128} height={43} alt="dekalo" />
          </Link>
          <div className="flex  items-center justify-center gap-3  px-1">
            <Link href="/" className="content-center">
              <Image src="/DashboardImages/iconoir_search.svg" width={24} height={24} alt="dekalo" />
            </Link>
            <Image src="/DashboardImages/ic_round-account-circle.svg" width={32} height={32} alt="avatar" />

            <div onClick={toggleNav} className="content-center">
              <Image src="/DashboardImages/List.svg" width={24} height={24} alt="dekalo" />
            </div>
          </div>
        </div>
        <div
          ref={navRef}
          className={`fixed left-0 top-0 z-50 h-full w-[250px] bg-[#ffffff] transition-transform duration-300 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 pt-3">
            <Image className="" src="/AuthImages/collapsed.svg" height={80} width={128} alt="" />
            <RxCross2 className="text-black" onClick={toggleNav} style={{ cursor: "pointer" }} />
          </div>

          <div className=" flex flex-col items-start space-y-2 p-4">
            <p className="clash-font text-xs">EXPLORE</p>
            <Link href="/dashboard" className={`flex items-center gap-2 pb-2 ${getNavLinkClass("/dashboard")}`}>
              <Image
                src={getNavImageSrc("/dashboard", "/AuthImages/Globe.svg", "/AuthImages/Globe.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Cases</p>
            </Link>

            <Link href="/doctors" className={`flex items-center gap-2 pb-2 ${getNavLinkClass("/doctors")}`}>
              <Image
                src={getNavImageSrc("/doctors", "/AuthImages/Users.svg", "/AuthImages/Users.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Doctors</p>
            </Link>
            <Link href="/upload-cases" className={`flex items-center gap-2 pb-2 ${getNavLinkClass("/upload-cases")}`}>
              <Image
                src={getNavImageSrc("/upload-cases", "/AuthImages/FilePlus.svg", "/AuthImages/FilePlus.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Uploads Cases</p>
            </Link>

            <Link
              href="/recently-viewed"
              className={`flex items-center gap-2 pb-3 ${getNavLinkClass("/recently-viewed")}`}
            >
              <Image
                src={getNavImageSrc("/recently-viewed", "/AuthImages/Clock.svg", "/AuthImages/Clock.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Recently Viewed</p>
            </Link>

            <p className="clash-font text-xs">MANAGE CASES</p>
            <Link href="/my-cases" className={`flex items-center gap-2 pb-2 ${getNavLinkClass("/my-cases")}`}>
              <Image
                src={getNavImageSrc("/my-cases", "/AuthImages/FolderOpen.svg", "/AuthImages/FolderOpen.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">My Cases</p>
            </Link>

            <Link
              href="/bookmarked-cases"
              className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/bookmarked-cases")}`}
            >
              <Image
                src={getNavImageSrc("/bookmarked-cases", "/AuthImages/FloppyDisk.svg", "/AuthImages/FloppyDisk.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Saved Cases</p>
            </Link>

            <p className="clash-font text-xs">SUPPORT</p>
            <Link href="/guidelines" className={`flex items-center gap-2 pb-2 ${getNavLinkClass("/guidelines")}`}>
              <Image
                src={getNavImageSrc("/guidelines", "/AuthImages/Question.svg", "/AuthImages/Question.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Guidlines</p>
            </Link>

            <Link href="/support" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/support")}`}>
              <Image
                src={getNavImageSrc("/support", "/AuthImages/Headset.svg", "/AuthImages/Headset.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Support And Help</p>
            </Link>

            <p className="clash-font text-xs">ACCOUNT</p>
            <Link
              href="/account-settings"
              className={`flex items-center gap-2 pb-2 ${getNavLinkClass("/account-settings")}`}
            >
              <Image
                src={getNavImageSrc("/account-settings", "/AuthImages/Gear.svg", "/AuthImages/Gear.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Account Settings</p>
            </Link>

            <Link href="/log-out" className={`flex items-center gap-2 pb-4 ${getNavLinkClass("/log-out")}`}>
              <Image
                src={getNavImageSrc("/log-out", "/AuthImages/SignOut.svg", "/AuthImages/SignOut.svg")}
                width={20}
                height={20}
                alt="avatar"
              />
              <p className="mt-1">Log Out</p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNav
