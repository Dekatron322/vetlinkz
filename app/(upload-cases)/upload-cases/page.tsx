"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import "aos/dist/aos.css"
import UploadCases from "components/Dashboard/UploadCases"

export default function Dashboard() {
  return (
    <section className="  w-full">
      <div className="flex  w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex ">
            <div className="flex w-full   max-md:flex-col  max-md:px-0 ">
              <div className="w-full">
                <UploadCases />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
