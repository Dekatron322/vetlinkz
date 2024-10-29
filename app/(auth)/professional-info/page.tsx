"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface UserData {
  id: string
  username: string
  email: string
  phone_number: string
  account_type: string
  name: string
}

type University = "Ahmadu Bello University Zaria" | "Federal University of Technology Minna"

type Specialization =
  | "Small Animal Practice"
  | "Large Animal Practice"
  | "Wildlife Practice"
  | "Avian and Fish Practice"

const Page: React.FC = () => {
  const [vcnNumber, setVcnNumber] = useState("")
  const [specialization, setSpecialization] = useState("")
  const [university, setUniversity] = useState("")
  const [state, setState] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [searchTerm, setSearchTerm] = useState<Specialization | "">("")
  const [universityTerm, setUniversityTerm] = useState<University | "">("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [showUniversityDropdown, setShowUniversityDropdown] = useState(false)

  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value as Specialization | "")
    setShowDropdown(true)
  }

  const handleUniversityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniversityTerm(event.target.value as University | "")
    setShowDropdown(true)
  }

  const handleDropdownSelect = (department: Specialization) => {
    setSearchTerm(department)
    setShowDropdown(false)
  }

  const handleUniversityDropdownSelect = (universities: University) => {
    setUniversityTerm(universities)
    setShowUniversityDropdown(false)
  }

  const handleCancelSearch = () => {
    setSearchTerm("")
    setShowDropdown(false)
  }

  const handleCancelUniversitySearch = () => {
    setUniversityTerm("")
    setShowUniversityDropdown(false)
  }

  useEffect(() => {
    if (showSuccessNotification || showErrorNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
        setShowErrorNotification(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showSuccessNotification, showErrorNotification])

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const userDetails = localStorage.getItem("userDetails")
      if (userDetails) {
        const userData = JSON.parse(userDetails) as UserData
        const userId = userData.id

        // Log the user data for debugging
        console.log("User data:", userData)

        const payload = {
          username: userData.username, // Ensure this is defined and not an empty string
          email: userData.email,
          phone_number: userData.phone_number,
          account_type: userData.account_type,
          name: userData.name,
          vcn_number: vcnNumber,
          specialization_category: searchTerm,
          university: universityTerm,
          state: state,
        }

        // Log the payload for debugging
        console.log("Payload for update:", payload)

        const response = await fetch(`https://vet.fyber.site/app_user/update/${userId}/`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          const updatedData = await response.json()
          localStorage.setItem("userDetails", JSON.stringify(updatedData))
          setShowSuccessNotification(true)
          router.push("/")
        } else {
          const errorData = await response.json()
          console.error("Update failed:", errorData)
          setError("An error occurred. Please try again.")
          setShowErrorNotification(true)
        }
      } else {
        setError("User data not found.")
        setShowErrorNotification(true)
      }
    } catch (error) {
      console.error("Request error:", error)
      setError("An error occurred. Please try again.")
      setShowErrorNotification(true)
    } finally {
      setLoading(false)
    }
  }

  const departments: Specialization[] = [
    "Small Animal Practice",
    "Large Animal Practice",
    "Wildlife Practice",
    "Avian and Fish Practice",
  ]

  const universities: University[] = ["Ahmadu Bello University Zaria", "Federal University of Technology Minna"]

  return (
    <>
      <div className="flex h-screen w-full justify-center max-md:bg-[#ffffff] md:items-center md:bg-[#F1F1F1]">
        <motion.div
          className="auth flex  justify-center bg-[#FFFFFF]  max-sm:w-[100%] xl:min-w-[600px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div className="w-full justify-center   ">
            <div className="flex items-center py-6 max-md:px-3 md:px-6 xl:min-w-[600px]">
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
                  src="./AuthImages/Professional.svg"
                  width={166}
                  height={24}
                  alt="profile"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="w-full border-b border-[#0000000D] "></div>

            <div className="mt-5 flex w-full justify-center">
              <form onSubmit={handleUpdate}>
                <label className="text-xs">VCN number</label>
                <div className="search-bg mb-2  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="text"
                      id="vcn"
                      placeholder="VCN234567"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={vcnNumber}
                      onChange={(e) => setVcnNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className=" text-xs">Area of Specialization</label>
                  <div className="search-bg mb-3 flex h-[40px] items-center justify-between gap-3 rounded px-3 py-1 hover:border-[#5378F6] focus:border-[#5378F6] focus:bg-[#FBFAFC] max-sm:mb-2 max-sm:w-full xl:w-[536px]">
                    <Image src="./AuthImages/CaretUp1.svg" width={24} height={24} alt="dekalo" />
                    <input
                      type="text"
                      id="search"
                      placeholder="Select Area of Specialization"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "45px" }}
                      value={searchTerm}
                      onChange={handleInputChange}
                      onFocus={() => setShowDropdown(true)}
                    />
                    {searchTerm && (
                      <button type="button" className="focus:outline-none" onClick={handleCancelSearch}>
                        <Image className="icon-style" src="./cancel.svg" width={16} height={16} alt="cancel" />
                        <Image
                          className="dark-icon-style"
                          src="./dark_cancel.svg"
                          width={16}
                          height={16}
                          alt="cancel"
                        />
                      </button>
                    )}
                  </div>
                  {showDropdown && (
                    <div className="dropdown absolute left-0 top-full z-10 w-full rounded-md">
                      {departments
                        .filter((department) => department.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((department, index) => (
                          <div
                            key={index}
                            className="cursor-pointer overflow-hidden px-4 py-2 hover:bg-[#747A80]"
                            onClick={() => handleDropdownSelect(department)}
                          >
                            <p className="text-xs font-medium">{department}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className=" text-xs">University</label>
                  <div className="search-bg mb-3 flex h-[40px] items-center justify-between gap-3 rounded px-3 py-1 hover:border-[#5378F6] focus:border-[#5378F6] focus:bg-[#FBFAFC] max-sm:mb-2 max-sm:w-full xl:w-[536px]">
                    <Image src="./AuthImages/CaretUp1.svg" width={24} height={24} alt="dekalo" />
                    <input
                      type="text"
                      id="search"
                      placeholder="Select University"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "45px" }}
                      value={universityTerm}
                      onChange={handleUniversityChange}
                      onFocus={() => setShowUniversityDropdown(true)}
                    />
                    {universityTerm && (
                      <button type="button" className="focus:outline-none" onClick={handleCancelUniversitySearch}>
                        <Image className="icon-style" src="./cancel.svg" width={16} height={16} alt="cancel" />
                        <Image
                          className="dark-icon-style"
                          src="./dark_cancel.svg"
                          width={16}
                          height={16}
                          alt="cancel"
                        />
                      </button>
                    )}
                  </div>
                  {showUniversityDropdown && (
                    <div className="dropdown absolute left-0 top-full z-10 w-full rounded-md">
                      {universities
                        .filter((universities) => universities.toLowerCase().includes(universityTerm.toLowerCase()))
                        .map((universities, index) => (
                          <div
                            key={index}
                            className="cursor-pointer overflow-hidden px-4 py-2 hover:bg-[#747A80]"
                            onClick={() => handleUniversityDropdownSelect(universities)}
                          >
                            <p className="text-xs font-medium">{universities}</p>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <label className=" text-xs">State</label>
                <div className="search-bg mb-2 h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-md:w-[340px] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="text"
                      id="state"
                      placeholder="Enter State"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>

            <div className="my-4 justify-center gap-1 ">
              <div className="mt-5 flex w-full justify-center gap-6 md:px-6">
                <button
                  type="submit"
                  className="button-primary h-[42px] w-full rounded-lg max-md:w-[340px] max-sm:h-[42px]"
                  disabled={loading}
                  onClick={handleUpdate}
                >
                  {loading ? "Signing Up..." : "Proceed"}
                </button>
              </div>
              <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>

              <div className="my-4 flex justify-center gap-1 px-6">
                <p className="text-base text-[#4F4F4F]">Already Have an Account Yet? </p>
                <Link href="/" className="text-base text-[#1B5EED]">
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#000000] bg-[#92E3A9] text-[#000000] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#000000]">User Successfully Created</span>
          <Image src="./AuthImages/Star2.svg" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#D14343]">{error}</span>
          <Image src="./AuthImages/failed.png" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
    </>
  )
}

export default Page
