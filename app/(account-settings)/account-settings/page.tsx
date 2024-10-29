"use client"
import { useState } from "react"
import DashboardNav from "components/Navbar/DashboardNav"
import Footer from "components/Footer/Footer"
import { IoIosArrowDropdown, IoIosArrowDropleft } from "react-icons/io"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Tab from "components/Search/Tab"

import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md"
import Image from "next/image"
import { motion } from "framer-motion"

// Extend the File type to include a preview property
interface PreviewFile extends File {
  preview: string
}

export default function AddServiceUser() {
  // Simulating user account existence with a state
  const [hasTransactions, setHasTransactions] = useState<boolean>(true)
  const [activeTab, setActiveTab] = useState<string>("general-info")

  // Use an array of PreviewFile for files state
  const [files, setFiles] = useState<PreviewFile[]>([])

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }

  const router = useRouter()

  const handleBackButtonClick = () => {
    router.back()
  }

  const renderContent = () => {
    switch (activeTab) {
      case "general-info":
        return (
          <form className="mt-4 flex w-full flex-col bg-[#F1F1F1]">
            <div className="px-6 py-3">
              <div className="mb-3 flex w-full flex-col items-start">
                <div className="input-field w-40">
                  <input
                    type="text"
                    id="placement"
                    placeholder="Sherif"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="text"
                    id="placement"
                    placeholder="Adamu"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="text"
                    id="placement"
                    placeholder="Shereefadamu001@gmail.com"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="text"
                    id="placement"
                    placeholder="+2349032456723"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="text"
                    id="placement"
                    placeholder="7 JAN, 1995"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </form>
        )
      case "risk-to-self":
        return (
          <form className="mt-4 flex w-full flex-col bg-[#F1F1F1]">
            <div className="px-6 py-3">
              <div className="mb-3 flex w-full flex-col items-start">
                <div className="input-field w-40">
                  <input
                    type="text"
                    id="placement"
                    placeholder="Category of Specialization"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="text"
                    id="placement"
                    placeholder="VCN Number"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="text"
                    id="placement"
                    placeholder="University"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </form>
        )
      case "risk-to-others":
        return (
          <form className="mt-4 flex w-full flex-col bg-[#F1F1F1]">
            <div className="px-6 py-3">
              <div className="mb-3 flex w-full flex-col items-start">
                <div className="input-field w-40">
                  <input
                    type="password"
                    id="placement"
                    placeholder="Old Password"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>

                <div className="input-field mt-4">
                  <input
                    type="password"
                    id="placement"
                    placeholder="New Password"
                    className="clash-font w-40 bg-transparent outline-none focus:outline-none"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>
          </form>
        )

      default:
        return null
    }
  }

  return (
    <>
      <section className="h-full">
        <div className="mx-auto flex min-h-screen ">
          <div className="flex w-full  flex-col ">
            <div>
              <DashboardNav />
            </div>
            <div className="justify-center gap-3  md:mt-8  md:flex md:flex-row">
              <motion.div
                className=" mb-6 flex flex-col  rounded-md  bg-[#ffffff]  md:w-[584px] md:shadow-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: "easeOut", duration: 1.5 }}
              >
                <div className="flex w-full justify-center p-4">
                  <p className="clash-font text-center text-2xl font-black max-md:text-xl">Account Settings</p>
                  {/* <p className="text-xs">25 January 2024</p> */}
                </div>
                <div className="border-b"></div>

                <div className="flex w-full flex-col items-center justify-center gap-3 py-3">
                  <Image
                    src="https://raw.githubusercontent.com/Dekatron322/vetlinks/41a36681eaee567c8bd3d9d49c61f1a3383c3392/public/DashboardImages/Avatar.svg"
                    width={100}
                    height={100}
                    alt="profile"
                    className="object-contain"
                  />
                  <button className="clash-font w-[181px] rounded-md border border-[#00000033] p-2 text-[#4F4F4F]">
                    {" "}
                    Change Profile Picture
                  </button>
                </div>
                <div className="border-b"></div>
                <div className="flex w-full gap-3  px-6">
                  <Tab
                    label="Personal Info"
                    onClick={() => setActiveTab("general-info")}
                    active={activeTab === "general-info"}
                  />
                  <Tab
                    label="Professional info."
                    onClick={() => setActiveTab("risk-to-self")}
                    active={activeTab === "risk-to-self"}
                  />
                  <Tab
                    label="Password"
                    onClick={() => setActiveTab("risk-to-others")}
                    active={activeTab === "risk-to-others"}
                  />
                </div>
                {renderContent()}
                <div className="flex px-6 max-md:bg-[#f1f1f1]">
                  <Link
                    href="/dashboard/post/"
                    type="button"
                    className="clash-font my-4 flex h-[42px] w-full items-center justify-center rounded-lg bg-[#1B5EED] p-3 px-4 text-white"
                  >
                    Save
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
