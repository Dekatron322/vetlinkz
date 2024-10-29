import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { RiArrowDropRightLine } from "react-icons/ri"
import { Doctors, Trending } from "utils"

interface Doctor {
  id: number
  username: string
  email: string
  phone_number: string
  address: string
  account_type: string
  university: string
  name: string
}

const DoctorsCard = () => {
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("https://vet.fyber.site/app_user/all/")
        const data = (await response.json()) as Doctor[]

        // const data = (await response.json()) as LoginResponse

        // Filter for users with account type of "registered doctor"
        const filteredDoctors = data.filter((user) => user.account_type === "registered doctor")
        setDoctors(filteredDoctors)
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchDoctors()
  }, [])

  const DoctorClick = () => {
    router.push("/doctors/doctor-detail")
  }

  const filteredDoctors = doctors.filter((item) => {
    return item.username.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const categories = ["All Categories", "Large Animals", "Small Animals", "Wild Life", "Avian And Fish"]

  const filteredTrending = Trending.filter((item) => {
    const matchesSearch = item.case.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })
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
            <div className="flex ">
              <div className="flex w-[300px] items-center gap-2 rounded-md border bg-white p-2">
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
            </div>
          </div>
        </div>
      </motion.div>
      <div className="w-full border-b"></div>

      <div className="grid grid-cols-8 gap-3 px-16 py-7 max-md:grid-cols-2 max-sm:grid-cols-2 max-sm:px-3">
        {filteredDoctors.map((item, trend) => (
          <motion.div
            className="h-auto w-full rounded-md bg-white"
            key={item.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            <div className="flex flex-col items-center justify-center py-4">
              <Image
                src="https://raw.githubusercontent.com/Dekatron322/vetlinks/4c115790e4a37c6a55932282fa6c7361d4863961/public/DashboardImages/Avatar.svg"
                width={80}
                height={80}
                alt=""
              />
              <p className="clash-font py-1 text-center text-base font-medium text-[#333333]">{item.name}</p>
              <p className="clash-font pb-2 text-center text-[9px] font-medium text-[#8E8E93]">{item.address}</p>
              <Image src="./DashboardImages/la.svg" width={31} height={32} alt="" />
            </div>

            <div className=" w-full border-b"></div>
            <div className="flex justify-between px-2 py-3">
              <div className="flex items-center gap-1">
                <Image
                  src="https://raw.githubusercontent.com/Dekatron322/vetlinks/6632ac7df178fd880c487f80b5d775d2c81efb88/public/DashboardImages/FileText.svg"
                  width={17.4}
                  height={17.4}
                  alt=""
                />
                <p className="clash-font  text-center text-sm font-medium text-[#333333]">Cases</p>
                <p className="clash-font  text-center text-sm text-[#333333]">10</p>
              </div>
              <Image
                className="cursor-pointer"
                src="https://raw.githubusercontent.com/Dekatron322/vetlinks/6632ac7df178fd880c487f80b5d775d2c81efb88/public/DashboardImages/ArrowUpRight.svg"
                width={12}
                height={12}
                alt=""
                onClick={DoctorClick}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default DoctorsCard
