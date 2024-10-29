"use client"
import DashboardNav from "components/Navbar/DashboardNav"

import "aos/dist/aos.css"
import DashboardMain from "components/Dashboard/Dashboard"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Dashboard() {
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex ">
            <div className="flex w-full gap-6  max-md:flex-col  max-md:px-0 md:mb-16">
              <div className="my-20  flex w-full items-center  justify-center">
                <motion.div
                  className="mx-auto flex  justify-center bg-[#ffffff]  max-sm:w-[100%] xl:max-w-[600px]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: "easeOut", duration: 1.5 }}
                >
                  <div className="w-full justify-center   ">
                    <div className="w-full border-b border-[#0000000D] max-md:hidden"></div>
                    <div className=" flex  flex-col items-center justify-center py-6 xl:min-w-[600px]">
                      <p className="clash-font text-2xl font-black"> Help and Support</p>
                    </div>
                    <div className="w-full border-b border-[#0000000D] max-md:hidden"></div>

                    <div className="flex w-full justify-center md:mt-5">
                      <form>
                        <label className="text-xs">Full Name</label>
                        <div className="search-bg mb-5 h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                          <input
                            type="text"
                            id="username"
                            placeholder="Shereefadamu001@gmail.com"
                            className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                            style={{ width: "100%", height: "24px" }}
                            value=""
                          />
                        </div>
                        <label className="text-xs">Email</label>
                        <div className="search-bg  mb-5  h-[48px] items-center justify-between rounded-lg px-3 py-3 hover:border-[#1B5EED4D] focus:border-[#1B5EED4D] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[536px]">
                          <input
                            type="text"
                            id="username"
                            placeholder="Shereefadamu001@gmail.com"
                            className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                            style={{ width: "100%", height: "24px" }}
                            value=""
                          />
                        </div>

                        <label className="text-xs ">Message</label>

                        <textarea
                          id="username"
                          placeholder="Shereefadamu001@gmail.com"
                          className="h-[24px] min-h-[158px] w-full rounded-lg border bg-transparent p-2 text-base outline-none focus:outline-none"
                          style={{ width: "100%", height: "24px" }}
                          value=""
                        ></textarea>
                      </form>
                    </div>

                    <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>

                    <div className="my-4 justify-center gap-1 ">
                      <div className="mt-5 flex w-full justify-center  gap-6 md:px-7">
                        <button
                          type="submit"
                          className="button-primary clash-font h-[42px] w-full rounded-lg max-md:w-[340px] max-sm:h-[42px]"
                        >
                          Send Message
                        </button>
                      </div>
                      <div className="mt-6 w-full border-b border-[#0000000D] max-md:hidden"></div>

                      <div className="my-4 flex w-full flex-col items-center justify-center gap-1 px-6">
                        <p className="clash-font text-xl font-black text-[#000000]">Social Media Coonect </p>
                        <p className="clash-font text-sm text-[#00000080]">Contact us on our social media handles</p>
                        <div className="my-5 flex w-full items-center justify-center gap-7">
                          <Link href="#">
                            <Image
                              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/WhatsappLogo.svg"
                              width={32}
                              height={32}
                              alt="profile"
                              className="object-contain"
                            />
                          </Link>
                          <Link href="#">
                            <Image
                              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/FacebookLogo.svg"
                              width={32}
                              height={32}
                              alt="profile"
                              className="object-contain"
                            />
                          </Link>
                          <Link href="#">
                            <Image
                              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/InstagramLogo.svg"
                              width={32}
                              height={32}
                              alt="profile"
                              className="object-contain"
                            />
                          </Link>
                          <Link href="#">
                            <Image
                              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/XLogo.svg"
                              width={32}
                              height={32}
                              alt="profile"
                              className="object-contain"
                            />
                          </Link>
                          <Link href="#">
                            <Image
                              src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/LinkedinLogo.svg"
                              width={32}
                              height={32}
                              alt="profile"
                              className="object-contain"
                            />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
