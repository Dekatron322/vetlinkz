"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"

type Gender = "Male" | "Female"

const Page: React.FC = () => {
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [dob, setDob] = useState("")
  const [password, setPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [gender, setGender] = useState<Gender | "">("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [searchTerm, setSearchTerm] = useState<Gender | "">("")
  const [showDropdown, setShowDropdown] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const router = useRouter()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value as Gender | "")
    setShowDropdown(true)
  }

  const handleDropdownSelect = (department: Gender) => {
    setSearchTerm(department)
    setShowDropdown(false)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleCancelSearch = () => {
    setSearchTerm("")
    setShowDropdown(false)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault() // Prevent default form submission behavior
    setLoading(true)
    setError(null)

    const payload = {
      username,
      email,
      phone_number: phoneNumber,
      account_type: "others", // Assuming account_type is fixed
      name, // Assuming the name is the same as the username
      gender: searchTerm,
      dob,
      password: "yourPassword", // Replace with a real password input
    }

    try {
      const response = await fetch("https://vet.fyber.site/app_user/sign-up/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setShowSuccessNotification(true)
        setTimeout(() => router.push("/"), 2000)
      } else {
        const errorData = await response.json()
        console.log("Error data:", errorData) // Log the error data to the console
        setError("An error occurred. Please try again.")
        setShowErrorNotification(true)
      }
    } catch (error) {
      console.error("Request error:", error) // Log network or other errors to the console
      setError("An error occurred. Please try again.")
      setShowErrorNotification(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (showSuccessNotification || showErrorNotification) {
      const timer = setTimeout(() => {
        setShowSuccessNotification(false)
        setShowErrorNotification(false)
      }, 5000) // Notifications will disappear after 5 seconds
      return () => clearTimeout(timer)
    }
  }, [showSuccessNotification, showErrorNotification])

  const departments: Gender[] = ["Male", "Female"]

  return (
    <>
      <div className="flex w-full items-center justify-center bg-[#F1F1F1] max-md:bg-[#ffffff] md:h-screen">
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
                  src="./AuthImages/Create_Account.svg"
                  width={166}
                  height={24}
                  alt="profile"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="w-full border-b border-[#0000000D]"></div>

            <div className="mt-5 flex w-full justify-center">
              <form onSubmit={handleSubmit}>
                <label className="text-xs">Usename</label>
                <div className="search-bg mb-2 h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-md:w-[340px] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="text"
                      id="username"
                      placeholder="Theophilus"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>
                <label className=" text-xs">Full Name</label>
                <div className="search-bg mb-2  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="text"
                      id="name"
                      placeholder="Thitus"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <label className=" text-xs">Email</label>
                <div className="search-bg mb-2  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="text"
                      id="email"
                      placeholder="Shereefadamu001@gmail.com"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <label className=" text-xs">Phone Nubmer</label>
                <div className="search-bg mb-2  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="08129859405"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <label className=" text-xs">Date of Birth</label>
                <div className="search-bg mb-2  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                  <div className="flex">
                    <input
                      type="date"
                      id="username"
                      placeholder="12/12/2001"
                      className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                      style={{ width: "100%", height: "24px" }}
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                    />
                    {/* <Image src="./AuthImages/CalendarDots.svg" width={24} height={24} alt="dekalo" /> */}
                  </div>
                </div>

                <div className="relative">
                  <label className=" text-xs">Gender</label>
                  <div className="search-bg mb-3 flex h-[48px] items-center justify-between gap-3 rounded px-3 py-1 hover:border-[#5378F6] focus:border-[#5378F6] focus:bg-[#FBFAFC] max-sm:mb-2 max-sm:w-full xl:w-[536px]">
                    <Image src="./AuthImages/CaretUp1.svg" width={24} height={24} alt="dekalo" />
                    <input
                      type="text"
                      id="search"
                      placeholder="Select department"
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
                      onChange={(e) => setPassword(e.target.value)}
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
              </form>
            </div>

            <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>
            <div className="my-4 justify-center gap-1 md:px-6">
              <div className="mt-5 flex w-full justify-center gap-6">
                <button
                  type="submit"
                  className="button-primary h-[42px] w-full rounded-lg max-md:w-[340px] max-sm:h-[42px]"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Signing In..." : "Continue"}
                </button>
              </div>
              <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>

              <div className="my-4 flex justify-center gap-1 px-6">
                <p className="text-base text-[#4F4F4F]">Dont Have an Account Yet? </p>
                <Link href="/signup" className="text-base text-[#1B5EED]">
                  Sign Up
                </Link>
              </div>
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
