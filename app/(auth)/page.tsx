"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"

interface LoginResponse {
  id: string
  token: string
}

type Department = "registered doctor" | "others"

const Page: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState<Department | "">("")
  const [showDropdown, setShowDropdown] = useState(false)

  const router = useRouter() // Initialize the router
  const departments: Department[] = ["registered doctor", "others"] // Set department to the default value 'vet'

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value as Department | "")
    setShowDropdown(true)
  }

  const handleDropdownSelect = (department: Department) => {
    setSearchTerm(department)
    setShowDropdown(false)
  }

  const handleCancelSearch = () => {
    setSearchTerm("")
    setShowDropdown(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://vet.fyber.site/app_user/sign-in/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, department: searchTerm }),
      })

      if (!response.ok) {
        throw new Error("Failed to sign in. Please try again.")
      }

      // Use 'LoginResponse' type to ensure data contains 'id' and 'token'
      const data = (await response.json()) as LoginResponse

      // Save ID and token in localStorage
      localStorage.setItem("id", data.id)
      localStorage.setItem("userToken", data.token)

      // Log ID and token in the console
      console.log("User ID:", data.id)
      console.log("User Token:", data.token)

      setShowSuccessNotification(true)
      setLoading(false)

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
      setShowErrorNotification(true)
      setLoading(false)
    }
  }

  // UseEffect to automatically hide notifications after a timeout
  useEffect(() => {
    if (showSuccessNotification || showErrorNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
        setShowErrorNotification(false)
      }, 5000) // Notifications will disappear after 5 seconds

      return () => clearTimeout(timer) // Clean up the timeout if component unmounts
    }
  }, [showSuccessNotification, showErrorNotification])

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#F1F1F1] max-md:bg-[#ffffff]">
        <motion.div
          className=" flex  justify-center bg-[#ffffff]  max-sm:w-[100%] xl:min-w-[600px]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div className="w-full justify-center   ">
            <div className=" flex items-center justify-center py-6 max-md:hidden xl:min-w-[600px]">
              <Image src="./AuthImages/login.svg" width={59} height={24} alt="profile" className="object-contain" />
            </div>
            <div className="w-full border-b border-[#0000000D] max-md:hidden"></div>
            <div className=" flex  flex-col items-center justify-center py-6 xl:min-w-[600px]">
              <Image src="./AuthImages/Vetlinks.svg" width={80} height={74} alt="profile" className="object-contain" />
              <Image
                src="./AuthImages/vetlinkss.svg"
                width={108}
                height={74}
                alt="profile"
                className="object-contain"
              />
            </div>
            <div className="w-full border-b border-[#0000000D] max-md:hidden"></div>

            <div className="flex w-full justify-center md:mt-5">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <label className="text-xs">Department</label>
                  <div className="search-bg mb-3 flex h-[50px] items-center justify-between gap-3 rounded px-3 py-1 hover:border-[#5378F6] focus:border-[#5378F6] focus:bg-[#FBFAFC] max-md:w-[340px] max-sm:mb-2  max-sm:mb-2 xl:w-[536x]">
                    <Image className="icon-style" src="/icons.svg" width={16} height={16} alt="dekalo" />
                    <Image className="dark-icon-style" src="/search-dark.svg" width={16} height={16} alt="dekalo" />
                    <input
                      type="text"
                      id="search"
                      placeholder="Select department"
                      className="h-[45px] w-full bg-transparent text-xs outline-none focus:outline-none"
                      style={{ width: "100%", height: "45px" }}
                      value={searchTerm}
                      onChange={handleInputChange}
                      onFocus={() => setShowDropdown(true)}
                    />
                    {searchTerm && (
                      <button type="button" className="focus:outline-none" onClick={handleCancelSearch}>
                        <Image className="icon-style" src="/cancel.svg" width={16} height={16} alt="cancel" />
                        <Image className="dark-icon-style" src="/dark_cancel.svg" width={16} height={16} alt="cancel" />
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
                <label className="text-xs">Username</label>
                <div className="search-bg mb-5 h-[48px]  items-center justify-between rounded-lg px-3 py-3  hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-md:w-[340px]  max-sm:mb-2 xl:w-[536x]">
                  <input
                    type="text"
                    id="username"
                    placeholder="Shereefadamu001@gmail.com"
                    className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                    style={{ width: "100%", height: "24px" }}
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>

                <label className="text-xs">Password</label>
                <div className="search-bg  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      id="password"
                      placeholder="*****************"
                      className="h-[24px]  bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button type="button" className="focus:outline-none" onClick={togglePasswordVisibility}>
                      {isPasswordVisible ? (
                        <RemoveRedEyeOutlinedIcon />
                      ) : (
                        <Image
                          className="icon-style"
                          src="/AuthImages/eye-close-line.png"
                          width={24}
                          height={24}
                          alt="toggle password visibility"
                        />
                      )}
                    </button>
                  </div>
                </div>

                <Link href="/forgot-password" className="flex content-center items-center justify-end gap-2">
                  <p className="mt-2 text-xs text-[#4F4F4F]">Forgot Password</p>
                </Link>

                <div className="mt-6 flex justify-center">
                  <button
                    type="submit"
                    className="button-primary h-[42px] w-full rounded-lg max-md:w-[340px] max-sm:h-[42px]"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Proceed"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>

            <div className="my-4 flex justify-center gap-1 px-6">
              <p className="text-base text-[#4F4F4F]">Don't Have an Account Yet?</p>
              <Link href="/signup" className="text-base text-[#1B5EED]">
                Sign Up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#000000] bg-[#92E3A9] text-[#000000] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#000000]">Login Successfully</span>
          <Image src="/AuthImages/Star2.svg" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#D14343]">{error}</span>
          <Image src="/AuthImages/failed.png" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
    </>
  )
}

export default Page
