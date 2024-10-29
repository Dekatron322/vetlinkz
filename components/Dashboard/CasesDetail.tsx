"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import Usercomment from "./comment"

interface Case {
  id: any
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

interface AppUser {
  id: any
  name: string
  address: string
}

const CasesDetails = () => {
  const router = useRouter()

  const [caseDetails, setCaseDetails] = useState<Case | null>(null)
  const [appUserName, setAppUserName] = useState<string | null>(null)
  const [appUserAddress, setAppUserAddress] = useState<string | null>(null)

  const handleGoBack = () => {
    router.back()
  }

  useEffect(() => {
    const caseId = localStorage.getItem("selectedCaseId")
    if (caseId) {
      const fetchCaseDetails = async () => {
        try {
          const response = await fetch(`https://vet.fyber.site/cases/cases/${caseId}/`)
          const data = (await response.json()) as Case
          setCaseDetails(data)

          // Fetch app_user's name and address if case data is fetched successfully
          if (data.app_user) {
            const userResponse = await fetch(`https://vet.fyber.site/app_user/all/`)
            const usersData = (await userResponse.json()) as AppUser[]

            // Find the user that matches the app_user ID
            const user = usersData.find((user) => user.id === data.app_user)
            if (user) {
              setAppUserName(user.name)
              setAppUserAddress(user.address)
            }
          }
        } catch (error) {
          console.error("Error fetching case details:", error)
        }
      }
      fetchCaseDetails()
    }
  }, [])

  if (!caseDetails) return <p>Loading...</p>

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
        className=" flex w-full px-16 py-7 max-sm:px-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <div>
          <div className="flex w-full items-center gap-3">
            <Image
              onClick={handleGoBack}
              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/4c115790e4a37c6a55932282fa6c7361d4863961/public/DashboardImages/CaretLeft.svg"
              width={24}
              height={24}
              alt=""
              className="cursor-pointer"
            />
            <Image
              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/4c115790e4a37c6a55932282fa6c7361d4863961/public/DashboardImages/Avatar.svg"
              width={80}
              height={80}
              alt=""
            />
            <div>
              <p className="clash-font text-sm font-medium capitalize text-[#333333]">{appUserName || "Loading..."}</p>
              <p className="clash-font font-regular py-2 text-xs text-[#4F4F4F]">{appUserAddress || "Loading..."}</p>
            </div>
          </div>
          <div className="mt-2 flex w-full md:hidden">
            <div className="flex w-full items-center gap-2 rounded-s-md border  px-2">
              <Image src="/DashboardImages/MagnifyingGlass.svg" width={20} height={20} alt="" />

              <p className="text-sm text-[#4F4F4F]">Search</p>
            </div>
            <div className="flex w-full cursor-pointer justify-between gap-2 rounded-r-md border p-2">
              <p className="text-sm text-[#4F4F4F]">All Categories</p>
              <Image src="/DashboardImages/CaretDown.svg" width={18} height={18} alt="" />
            </div>
          </div>
          <div className="relative mt-5 flex gap-3 max-sm:hidden">
            <div className="flex ">
              <div className="flex w-[300px] items-center gap-2 rounded-s-md border bg-white px-2">
                <Image src="/DashboardImages/MagnifyingGlass.svg" width={20} height={20} alt="" />

                <p className="text-sm text-[#4F4F4F]">Search</p>
              </div>
              <div className="flex cursor-pointer gap-2 rounded-r-md border bg-[#ffffff] p-2">
                <p className="text-sm text-[#4F4F4F]">Filter</p>
                <Image src="/DashboardImages/FunnelSimple.svg" width={18} height={18} alt="" />
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex items-center gap-2 rounded-s-md border bg-white px-3">
                <p className="text-sm text-[#4F4F4F]">Categories</p>
              </div>
              <div className="flex cursor-pointer items-center gap-2 rounded-r-md border bg-[#ffffff] px-3">
                <p className="text-sm text-[#4F4F4F]">All Categories</p>
                <Image src="/DashboardImages/CaretDown.svg" width={18} height={18} alt="" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <div className="w-full border-b"></div>

      <div className="w-full gap-5  px-16 max-sm:grid-cols-1   max-sm:px-3 md:flex">
        <motion.div
          className="my-5 h-auto md:w-[60%]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div
            style={{ position: "relative", width: "100%", height: "400px", borderRadius: "8px" }}
            className="max-sm:hidden"
          >
            <Image
              src={
                caseDetails.image
                  ? `https://vet.fyber.site${caseDetails.image}`
                  : "https://raw.githubusercontent.com/Dekatron322/vetlinks/b0e7cf341532d27a7087f6375171d82da8bf7224/public/DashboardImages/cow.svg"
              }
              alt=""
              layout="fill"
              objectFit="contain"
              className="rounded-lg max-sm:hidden"
            />
          </div>

          <div
            style={{ position: "relative", width: "100%", height: "400px", borderRadius: "8px" }}
            className="sm:hidden"
          >
            <Image
              src={
                caseDetails.image
                  ? `https://vet.fyber.site${caseDetails.image}`
                  : "https://raw.githubusercontent.com/Dekatron322/vetlinks/b0e7cf341532d27a7087f6375171d82da8bf7224/public/DashboardImages/cow.svg"
              }
              alt=""
              layout="fill"
              objectFit="contain"
              className="rounded-lg sm:hidden"
            />
          </div>
          <p className="clash-font py-3 text-xl font-black text-[#00000080]">
            TOPIC: <span className=" text-black">{caseDetails.case_title}</span>
          </p>

          <p className="clash-font  font-regular  text-base text-[#00000080]">
            CLINICIAN: <span className="uppercase text-black">{appUserName || "Loading..."}</span>
          </p>
          <div className="gap-4 py-3 md:flex">
            <p className="clash-font  font-regular  text-base text-[#00000080]">
              CATEGORY: <span className="text-black">{caseDetails.category}</span>
            </p>
            <p className="clash-font font-regular text-base  text-[#00000080] max-sm:my-3">
              BREED: <span className="text-black">NDAMA</span>
            </p>
            <p className="clash-font  font-regular  text-base text-[#00000080]">
              DATE: <span className="text-black">{formatDate(caseDetails.created_at)}</span>
            </p>
          </div>
          <div className=" w-full border-b"></div>

          <div className="py-5">
            <p className="text-base text-[#000000]">SIGNALMENT AND HISTORY</p>
            <p className="clash-font pt-3 leading-7">{caseDetails.signalment_and_history}</p>
          </div>
          <div className=" w-full border-b"></div>
          <div className="py-5">
            <p className="text-base text-[#000000]">CLINICAL EXAMINATION</p>
            <p className="py-3">Table: vital parameters of the patient</p>
            <div className="flex justify-between  pt-3 md:w-[80%]">
              <div className="">
                <p className="pb-2">Parameter values.</p>
                <p className="pb-2">Temperature (°c).</p>
                <p className="pb-2">Pulse rate (beats/min)</p>
                <p>Respiratory rate (cycles/min)</p>
              </div>
              <div>
                <p className="pb-2 ">Patient values (Day 1)</p>
                <p className="pb-2 text-center">38.2</p>
                <p className="pb-2 text-center">132</p>
                <p className="text-center">48</p>
              </div>
              <div>
                <p>Reference</p>
                <p className="pb-2 text-center">38.5-39.4</p>
                <p className="pb-2 text-center">60-90</p>
                <p className="text-center">15-30</p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="border-l border-gray-300"></div>
        <Usercomment caseId={caseDetails.id} />
      </div>
    </section>
  )
}

export default CasesDetails
