"use client"
import DashboardNav from "components/Navbar/DashboardNav"

import "aos/dist/aos.css"
import SavedCases from "components/Dashboard/SavedCases"

export default function Cases() {
  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex ">
            <div className="flex w-full gap-6  max-md:flex-col  max-md:px-0 md:mb-16">
              <div className="w-full">
                <SavedCases />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}