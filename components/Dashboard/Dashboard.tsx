import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { RiArrowDropRightLine } from "react-icons/ri"
import { Trending } from "utils"

interface Case {
  id: number
  category: string
  case_title: string
  image: string
  signalment_and_history: string
  clinical_examination: string
  clinical_findings: string
  differential_diagnoses: string
  tentative_diagnoses: string
  management: string
  diagnostic_plan: string
  advice_to_clients: string
  assistants: string
  laboratory_reports: string
  created_at: string
  app_user: string
}

interface User {
  id: any
  name: string
}

const categories = ["All Categories", "Large Animal", "Small Animal", "Wildlife", "Avian and Fish"]

const Dashboard = () => {
  const router = useRouter()
  const [cases, setCases] = useState<Case[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [users, setUsers] = useState<Record<number, string>>({})
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({})

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("https://vet.fyber.site/cases/cases/all/")
        const data = (await response.json()) as Case[]
        setCases(data)
      } catch (error) {
        console.error("Error fetching cases:", error)
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("https://vet.fyber.site/app_user/all/")
        const data = (await response.json()) as User[]
        const userMapping = data.reduce((acc: Record<number, string>, user: User) => {
          acc[user.id] = user.name
          return acc
        }, {})
        setUsers(userMapping)
      } catch (error) {
        console.error("Error fetching users:", error)
      }
    }

    const fetchCommentCounts = async () => {
      try {
        const counts: Record<number, number> = {}
        await Promise.all(
          cases.map(async (item) => {
            const response = await fetch(`https://vet.fyber.site/cases/cases/${item.id}/comments/`)
            const data = (await response.json()) as unknown // Assert data as unknown initially
            if (Array.isArray(data)) {
              counts[item.id] = data.length
            } else {
              console.warn("Unexpected data format for comments", data)
              counts[item.id] = 0 // Default to 0 if data is not an array
            }
          })
        )
        setCommentCounts(counts)
      } catch (error) {
        console.error("Error fetching comment counts:", error)
      }
    }

    fetchCases()
    fetchUsers()
    fetchCommentCounts()
  }, [cases])

  const filteredCases = cases.filter((item) => {
    const matchesSearch = item.case_title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const CaseClick = (id: number) => {
    localStorage.setItem("selectedCaseId", id.toString())
    router.push("/dashboard/cases-details")
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }
  return (
    <section>
      <motion.div
        className="px-16 py-7 max-sm:px-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <div className="flex items-center gap-1">
          <p className="clash-font text-sm text-[#00000080] ">Explore </p>
          <p>
            <RiArrowDropRightLine />
          </p>
          <p className="clash-font text-sm text-[#00000080] ">Cases</p>
        </div>
        <p className="clash-font text-lg font-black text-black">Trending Cases</p>

        <div>
          <div className="mt-2 flex w-full md:hidden">
            <div className="flex w-full items-center gap-2 rounded-s-md border  px-2">
              <Image src="./DashboardImages/MagnifyingGlass.svg" width={20} height={20} alt="" />

              <p className="text-sm text-[#4F4F4F]">Search</p>
            </div>
            <div className="flex w-full cursor-pointer justify-between gap-2 rounded-r-md border p-2">
              <p className="text-sm text-[#4F4F4F]">All Categories</p>
              <Image src="./DashboardImages/CaretDown.svg" width={18} height={18} alt="" />
            </div>
          </div>
          <div className="relative mt-5 flex gap-3 max-sm:hidden">
            <div className="relative flex">
              <div className="flex w-[300px] items-center gap-2 rounded-s-md border bg-white px-2">
                <Image src="./DashboardImages/MagnifyingGlass.svg" width={20} height={20} alt="" />

                <input
                  type="text"
                  id="username"
                  placeholder="Search"
                  className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                  style={{ width: "100%", height: "24px" }}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex cursor-pointer gap-2 rounded-r-md border bg-[#ffffff] p-2"
              >
                <p className="text-sm text-[#4F4F4F]">Filter</p>
                <Image src="./DashboardImages/FunnelSimple.svg" width={18} height={18} alt="" />
              </div>
              {isDropdownOpen && (
                <div className="z-100 absolute left-0  top-12 w-[200px] rounded-md border bg-white shadow-md">
                  {categories.map((category, index) => (
                    <p
                      key={index}
                      className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => {
                        setSelectedCategory(category)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {category}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div className="flex ">
              <div className="flex items-center gap-2 rounded-s-md border bg-white px-3">
                <p className="text-sm text-[#4F4F4F]">Categories</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-r-md border bg-[#ffffff] px-3">
                <p className="text-sm text-[#4F4F4F]">All Categories</p>
                <Image src="./DashboardImages/CaretDown.svg" width={18} height={18} alt="" />
              </div>
            </div>

            <div className="flex ">
              <div className="flex items-center gap-2 rounded-s-md border bg-white px-3">
                <p className="text-sm text-[#4F4F4F]">Date Joined</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-r-md border bg-[#ffffff] px-3">
                <Image src="./DashboardImages/Date.svg" width={18} height={18} alt="" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="w-full border-b"></div>

      <div className="relative -z-10 grid grid-cols-4 gap-5 px-16 py-7 max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:px-3">
        {filteredCases.map((item) => (
          <motion.div
            className="z-0 h-auto w-full rounded-lg bg-white"
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <Image src="./DashboardImages/ic_round-account-circle.svg" width={32} height={32} alt="" />
                <div>
                  <p className="clash-font text-[#333333]">{users[item.app_user as any] || "Unknown User"}</p>
                  <p className="text-xs text-[#8E8E93]">{item.category}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Image src="./DashboardImages/la.svg" width={36} height={32} alt="" />
                <Image src="./DashboardImages/dots.svg" width={5} height={32} alt="" />
              </div>
            </div>
            <div style={{ position: "relative", width: "100%", height: "161px" }}>
              <Image
                src={
                  item.image
                    ? `https://vet.fyber.site${item.image}`
                    : "https://raw.githubusercontent.com/Dekatron322/vetlinks/b0e7cf341532d27a7087f6375171d82da8bf7224/public/DashboardImages/cow.svg"
                }
                alt=""
                layout="fill"
                objectFit="cover"
              />
            </div>
            <p
              onClick={() => CaseClick(item.id)}
              className="clash-font cursor-pointer px-4 py-3 text-base font-medium text-[#333333] transition-opacity duration-300 hover:opacity-80"
            >
              {item.case_title}
            </p>
            <div className=" w-full border-b"></div>
            <p className="clash-font px-4 py-3 text-xs font-medium text-[#8E8E93]">{formatDate(item.created_at)}</p>
            <div className=" w-full border-b"></div>

            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-1">
                <Image src="./DashboardImages/ShareFat.svg" width={24} height={24} alt="" />
                <p className="text-sm text-[#8E8E93]">0</p>
              </div>
              <div className="flex items-center gap-1">
                <Image src="./DashboardImages/ChatCircleText.svg" width={24} height={24} alt="" />
                <p className="text-sm text-[#8E8E93]">{commentCounts[item.id] || 0}</p>
              </div>
              <div className="flex items-center gap-1">
                <Image src="./DashboardImages/BookmarkSimple.svg" width={24} height={24} alt="" />
                <p className="text-sm text-[#8E8E93]">0</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Dashboard
