"use client"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"

const Page: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState("doctor") // Track the selected option
  const router = useRouter() // Initialize the router

  // Handler for selecting an option
  const handleSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleSubmit = () => {
    setLoading(true)

    // Redirect based on the selected option
    if (selectedOption === "doctor") {
      router.push("/verify-number") // Redirect to the doctor's dashboard
    } else if (selectedOption === "others") {
      router.push("/others") // Redirect to the "others" dashboard
    }

    setLoading(false) // You can also move this after the redirect if you want
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#F1F1F1] max-md:bg-[#ffffff]">
        <motion.div
          className="auth flex  justify-center bg-[#FFFFFF]  max-sm:w-[100%] xl:min-w-[600px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div className="w-auto justify-center">
            <div className="flex items-center px-6 py-6 xl:min-w-[600px]">
              <Image
                src="./AuthImages/CaretUp.svg"
                width={24}
                height={24}
                alt="profile"
                className="cursor-pointer object-contain"
                onClick={() => router.back()}
              />
              <div className="flex w-full items-center justify-center">
                <Image
                  src="./AuthImages/Create_Account.svg"
                  width={166}
                  height={24}
                  alt="profile"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="w-full border-b border-[#0000000D] "></div>

            <div className="mt-5 w-full justify-center px-6">
              {/* Registered Doctor Option */}
              <div
                onClick={() => handleSelect("doctor")}
                className={`mb-3 flex h-[84px] w-full items-center gap-2 rounded-lg border-2 ${
                  selectedOption === "doctor" ? "border-[#1B5EED] bg-[#F1F1F1]" : "border-[#0000000D] bg-[#F1F1F1]"
                } cursor-pointer px-2`}
              >
                <Image
                  src={selectedOption === "doctor" ? "./AuthImages/Radio.svg" : "./AuthImages/RadioEmpty.svg"}
                  width={24}
                  height={24}
                  alt="profile"
                  className="object-contain"
                />
                <div>
                  <p className="mb-2 font-bold">Registered Doctor</p>
                  <p className="text-xs">Currently having a VCN Number</p>
                </div>
              </div>

              {/* Others Option */}
              <div
                onClick={() => handleSelect("others")}
                className={`flex h-[84px] w-full items-center gap-2 rounded-lg border-2 ${
                  selectedOption === "others" ? "border-[#1B5EED] bg-[#F1F1F1]" : "border-[#0000000D] bg-[#F1F1F1]"
                } cursor-pointer px-2`}
              >
                <Image
                  src={selectedOption === "others" ? "./AuthImages/Radio.svg" : "./AuthImages/RadioEmpty.svg"}
                  width={24}
                  height={24}
                  alt="profile"
                  className="object-contain"
                />
                <div>
                  <p className="mb-1 font-bold">Others</p>
                  <p className="text-xs">Currently Schooling in any of the Accredited Vet schools</p>
                </div>
              </div>
            </div>

            <div className="mt-6 w-full border-b border-[#0000000D]"></div>

            <div className="my-6 flex justify-center gap-1 px-6">
              <button
                type="submit"
                className="button-primary h-[42px] w-full rounded-lg max-sm:h-[42px]"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Signing In..." : "Continue"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Page
