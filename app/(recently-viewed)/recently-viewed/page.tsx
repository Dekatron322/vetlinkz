"use client"
import DashboardNav from "components/Navbar/DashboardNav"

import "aos/dist/aos.css"
import Sidebar from "components/Sidebar/Sidebar"
import DashboardMain from "components/Dashboard/Dashboard"
import RecentViews from "components/Dashboard/RecentViews"

interface Patient {
  id: string
  name: string
  gender: string
  dob: string
  appointments: {
    id: number
    doctor: string
    detail: string
    pub_date: string
  }[]
  // Add other fields as needed
}

interface Department {
  name: string
}

interface Staff {
  username: string
}

export default function RecentlyViewed() {
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex ">
            <div className="flex w-full gap-6  max-md:flex-col  max-md:px-0 md:mb-16">
              <div className="w-full">
                <RecentViews />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
