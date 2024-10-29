"use client"
import { useEffect, useState } from "react"
import AOS from "aos"
import "aos/dist/aos.css"
import DashboardNav from "components/Navbar/DashboardNav"
import Sidebar from "components/Sidebar/Sidebar"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import Image from "next/image"
import { RxCross2 } from "react-icons/rx"
import WestIcon from "@mui/icons-material/West"

export default function ServiceCharge() {
  const [searchText, setSearchText] = useState("")

  const handleCancelSearch = () => {
    setSearchText("")
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div className="flex min-h-screen">
      <section className="flex-1">
        <div className="flex w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full gap-6  px-10 max-md:flex-col max-md:px-4 max-md:pt-6 md:mb-16">
              <div className="w-full ">
                <div className="my-7 flex items-center justify-between">
                  <h5 className="text-[28px] font-medium">Chats</h5>
                  <div className="relative"></div>
                  <div className="flex items-center gap-2">
                    <p className="opacity-50">Chats</p>
                    <KeyboardArrowRightIcon className="opacity-50" />
                    <p className="opacity-50">Dashboard</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-[30%] bg-white p-4 ">
                    <div className=" flex h-[45px] w-full items-center justify-between  gap-3 rounded-lg bg-[#F3F3F3] px-3 py-1 text-[#707070]">
                      <Image src="./Dashboardimages/Search.svg" width={16} height={16} alt="dekalo" />
                      <input
                        type="text"
                        id="search"
                        placeholder="Search by name or house number"
                        className="h-[45px] w-full bg-transparent  outline-none focus:outline-none"
                        style={{ width: "100%", height: "50px" }}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                      {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
                    </div>
                    <div className="mt-4 flex">
                      <div className="flex w-full justify-between">
                        <div className="flex gap-2">
                          <Image src="./Icons/chats-user.svg" width={50} height={50} alt="dekalo" />
                          <div>
                            <p className="mb-[10px] font-medium">House No. 45</p>
                            <p className="text-xs">We should meet later in the....</p>
                          </div>
                        </div>
                        <div className="items-end">
                          <p className="mb-[10px]">17/06/23</p>
                          <div className="flex justify-end">
                            <p className="h-5 w-[18px]  rounded-full bg-[#EEC202] text-center">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 h-[1px] w-full bg-black opacity-5"></div>
                    <div className="mt-4 flex">
                      <div className="flex w-full justify-between">
                        <div className="flex gap-2">
                          <Image src="./Icons/chats-user.svg" width={50} height={50} alt="dekalo" />
                          <div>
                            <p className="mb-[10px] font-medium">House No. 45</p>
                            <p className="text-xs">We should meet later in the....</p>
                          </div>
                        </div>
                        <div className="items-end">
                          <p className="mb-[10px]">17/06/23</p>
                          <div className="flex justify-end">
                            <p className="h-5 w-[18px]  rounded-full bg-[#EEC202] text-center">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 h-[1px] w-full bg-black opacity-5"></div>
                    <div className="mt-4 flex">
                      <div className="flex w-full justify-between">
                        <div className="flex gap-2">
                          <Image src="./Icons/chats-user.svg" width={50} height={50} alt="dekalo" />
                          <div>
                            <p className="mb-[10px] font-medium">House No. 45</p>
                            <p className="text-xs">We should meet later in the....</p>
                          </div>
                        </div>
                        <div className="items-end">
                          <p className="mb-[10px]">17/06/23</p>
                          <div className="flex justify-end">
                            <p className="h-5 w-[18px]  rounded-full bg-[#EEC202] text-center">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 h-[1px] w-full bg-black opacity-5"></div>
                    <div className="mt-4 flex">
                      <div className="flex w-full justify-between">
                        <div className="flex gap-2">
                          <Image src="./Icons/chats-user.svg" width={50} height={50} alt="dekalo" />
                          <div>
                            <p className="mb-[10px] font-medium">House No. 45</p>
                            <p className="text-xs">We should meet later in the....</p>
                          </div>
                        </div>
                        <div className="items-end">
                          <p className="mb-[10px]">17/06/23</p>
                          <div className="flex justify-end">
                            <p className="h-5 w-[18px]  rounded-full bg-[#EEC202] text-center">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 h-[1px] w-full bg-black opacity-5"></div>
                    <div className="mt-4 flex">
                      <div className="flex w-full justify-between">
                        <div className="flex gap-2">
                          <Image src="/Icons/chats-user.svg" width={50} height={50} alt="dekalo" />
                          <div>
                            <p className="mb-[10px] font-medium">House No. 45</p>
                            <p className="text-xs">We should meet later in the....</p>
                          </div>
                        </div>
                        <div className="items-end">
                          <p className="mb-[10px]">17/06/23</p>
                          <div className="flex justify-end">
                            <p className="h-5 w-[18px]  rounded-full bg-[#EEC202] text-center">3</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <button className="button-rounded w-full rounded px-10 py-2 text-white">Start New Chat</button>
                    </div>
                  </div>
                  <div className="flex h-auto w-[70%] flex-col  bg-white py-4">
                    <div className=" flex items-center gap-2 px-4">
                      <div className="flex items-center gap-4">
                        <WestIcon />
                        <div className="flex items-center gap-2">
                          <Image src="/Icons/chats-user.svg" width={50} height={50} alt="dekalo" />
                          <div>
                            <p className="font-medium">House No. 45</p>
                            <p className="text-xs">Online</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="my-3 h-[1px] w-full bg-black opacity-5"></div>
                    <div className="w-full px-4">
                      <div className="chat-bubble relative max-w-[588px] rounded-bl-lg rounded-se-3xl bg-[#F3F3F3] p-3 ">
                        <p className="text-xs">
                          the prestigious Asokoro neighborhood, known for its upscale residences and diplomatic
                          presence. The property boasts high-end finishes, a contemporary design, and ample space for
                          both indoor and outdoor living. The private swimming pool and well-maint
                        </p>
                        <p className="mt-3 text-end text-xs font-medium text-[#FF6A5A]">10:30am</p>
                      </div>
                      <div className="mt-5 flex w-full justify-end">
                        <div className="chat-bubble relative max-w-[588px]  rounded-br-lg rounded-ss-3xl bg-[#F3F3F3] p-3 ">
                          <p className="text-xs">
                            the prestigious Asokoro neighborhood, known for its upscale residences and diplomatic
                            presence. The property boasts high-end finishes, a contemporary design, and ample space for
                            both indoor and outdoor living. The private swimming pool and well-maint
                          </p>
                          <p className="mt-3 text-xs font-medium text-[#FF6A5A]">10:30am</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto flex w-full gap-4 px-4">
                      <div className=" flex h-[55px] w-full items-center justify-between  gap-3 rounded-lg bg-[#F3F3F3] px-4 py-1 text-[#707070]">
                        <Image src="./Dashboardimages/Search.svg" width={16} height={16} alt="dekalo" />
                        <input
                          type="text"
                          id="search"
                          placeholder="Search by name or house number"
                          className="h-[55px] w-full bg-transparent  outline-none focus:outline-none"
                          style={{ width: "100%", height: "50px" }}
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                        <div className="flex gap-3">
                          <Image src="/Icons/Plus.svg" width={16} height={16} alt="dekalo" />
                          <Image src="/Icons/Camera.svg" width={16} height={16} alt="dekalo" />
                        </div>
                      </div>
                      <Image src="/Icons/Voicenote.svg" width={51} height={51} alt="dekalo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
