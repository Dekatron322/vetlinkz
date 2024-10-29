"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { RiArrowDropRightLine } from "react-icons/ri"
import axios from "axios"

interface FileData {
  file: File
  preview: string
}

type Specialization = "Small Animal" | "Large Animal" | "Wildlife" | "Avian and Fish"

const UploadCases = () => {
  const router = useRouter()
  const [files, setFiles] = useState<FileData[]>([])

  // Form state variables
  const [category, setCategory] = useState("Surgery")
  const [caseTitle, setCaseTitle] = useState("")
  const [signalment, setSignalment] = useState("")
  const [history, setHistory] = useState("")
  const [clinicalExamination, setClinicalExamination] = useState("")
  const [clinicalFindings, setClinicalFindings] = useState("")
  const [differentialDiagnosis, setDifferentialDiagnosis] = useState("")
  const [tentativeDiagnoses, setTentativeDiagnoses] = useState("")
  const [management, setManagement] = useState("")
  const [diagnosisPlan, setDiagnosisPlan] = useState("")
  const [searchTerm, setSearchTerm] = useState<Specialization | "">("")
  const [adviceToClients, setAdviceToClients] = useState("")
  const [assistants, setAssistants] = useState("")
  const [appUserId, setAppUserId] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)

  const handleGoBack = () => {
    router.back()
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value as Specialization | "")
    setShowDropdown(true)
  }

  const handleDropdownSelect = (department: Specialization) => {
    setSearchTerm(department)
    setShowDropdown(false)
  }

  const handleCancelSearch = () => {
    setSearchTerm("")
    setShowDropdown(false)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))

    // Limit to one file
    if (selectedFiles.length > 1) {
      alert("Only one image can be uploaded.")
      return
    }

    setFiles(selectedFiles)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFiles = Array.from(event.dataTransfer.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles])
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const submitCase = async () => {
    try {
      // Retrieve the logged-in user's ID from localStorage
      const appUserId = localStorage.getItem("id")

      if (!appUserId) {
        alert("User not logged in. Please log in again.")
        return
      }

      // Create a FormData object to handle text data and file uploads
      const formData = new FormData()
      formData.append("category", searchTerm)
      formData.append("case_title", caseTitle)
      formData.append("signalment_and_history", signalment)
      formData.append("clinical_examination", clinicalExamination)
      formData.append("clinical_findings", clinicalFindings)
      formData.append("differential_diagnoses", differentialDiagnosis)
      formData.append("tentative_diagnoses", tentativeDiagnoses)
      formData.append("management", management)
      formData.append("diagnostic_plan", diagnosisPlan)
      formData.append("advice_to_clients", adviceToClients)
      formData.append("assistants", assistants)
      formData.append("app_user", appUserId)

      // Append each image file to formData
      if (files[0]) {
        formData.append("image", files[0].file)
      }

      // Make the request to create a case with files
      const response = await axios.post("https://vet.fyber.site/cases/create-case/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      if (response.status === 201) {
        alert("Case created successfully!")
        router.push("/dashboard") // Redirect to cases page or another location
      }
    } catch (error) {
      console.error("Failed to create case:", error)
      alert("Failed to create case. Please try again.")
    }
  }

  const departments: Specialization[] = ["Small Animal", "Large Animal", "Wildlife", "Avian and Fish"]

  return (
    <section>
      <div className="w-full border-b"></div>

      <div className="w-full gap-5 px-16 max-sm:grid-cols-1 max-sm:px-3 md:flex">
        <motion.div
          className="z-20 my-5 h-auto md:w-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div>
            <div className="mb-3 items-center gap-3">
              <div className="flex items-center gap-1">
                <p className="clash-font text-sm text-[#00000080] ">Explore </p>
                <p>
                  <RiArrowDropRightLine />
                </p>
                <p className="clash-font text-sm text-[#00000080] ">Upload Cases</p>
              </div>
              <p className="clash-font text-lg font-black text-black">Upload Cases</p>
            </div>

            <div className="relative">
              <div className="search-bg mb-3 flex h-[40px] items-center justify-between gap-3 rounded px-3 py-1 hover:border-[#5378F6] focus:border-[#5378F6] focus:bg-[#FBFAFC] max-sm:mb-2 max-sm:w-full xl:w-[536px]">
                Category
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
                    <Image className="dark-icon-style" src="./dark_cancel.svg" width={16} height={16} alt="cancel" />
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
            <textarea
              id="caseTitle"
              placeholder="Case Title"
              className="clash-font h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
              style={{ width: "100%", height: "24px" }}
              value={caseTitle}
              onChange={(e) => setCaseTitle(e.target.value)}
            ></textarea>
          </div>
        </motion.div>
        <div className="border-l border-gray-300"></div>
        <motion.div
          className="flex w-full flex-col"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          <div className="my-5">
            <div className="items-center gap-3">
              <p className="clash-font text-xl font-black text-black">Upload Relevant Gallery</p>
              <div className="flex items-center gap-1">
                <p className="clash-font text-sm text-[#00000080]">Maximum File To be Uploaded is 3</p>
              </div>
            </div>
            <div>
              <div
                className="-z-10 my-3 cursor-pointer gap-2 rounded-md border bg-[#ffffff] px-3 py-3 md:w-[395px]"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <p className="clash-font text-sm text-[#4F4F4F]">Drag & drop images here, or click to select files</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="z-50">
            {files.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Uploaded Files:</p>
                <div className="my-3 flex w-full items-center justify-between">
                  <ul className="flex w-full flex-col">
                    {files.map((file, index) => (
                      <div className="flex w-full items-center justify-between" key={index}>
                        <li className="mb-2 flex items-center gap-3">
                          <img
                            src={file.preview}
                            alt={file.file.name}
                            className="mb-1 h-20 w-20 rounded-md object-cover"
                          />
                          <p className="clash-font text-sm font-medium text-[#00000080]">{file.file.name}</p>
                        </li>

                        <div onClick={() => handleDelete(index)}>
                          <Image
                            src="https://raw.githubusercontent.com/Dekatron322/vetlinks/b721914799897ac7d91ebd4b67ca487169f1e95e/public/DashboardImages/Trash.svg"
                            width={24}
                            height={24}
                            alt="Delete"
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <motion.div
        className="border-b"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      ></motion.div>
      <motion.div
        className="items-center gap-3 pt-5 max-md:px-3 md:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <p className="clash-font text-xl font-black text-black">Case Details</p>
        <div className="flex items-center gap-1">
          <p className="clash-font text-sm text-[#00000080] ">Fill The Case details Appropriately</p>
        </div>
      </motion.div>
      <motion.div
        className="z-10 grid gap-5 py-5 max-md:px-3 md:grid-cols-3 md:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <textarea
          id="signalment"
          placeholder="Signalment And HIstory"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={signalment}
          onChange={(e) => setSignalment(e.target.value)}
        ></textarea>
        <textarea
          id="clinicalExamination"
          placeholder="Clinical Examination"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={clinicalExamination}
          onChange={(e) => setClinicalExamination(e.target.value)}
        ></textarea>
        <textarea
          id="clinical findings"
          placeholder="Clinical Findings"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={clinicalFindings}
          onChange={(e) => setClinicalFindings(e.target.value)}
        ></textarea>
        <textarea
          id="differential diagnosis"
          placeholder="Differential Diagnoses"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={differentialDiagnosis}
          onChange={(e) => setDifferentialDiagnosis(e.target.value)}
        ></textarea>
        <textarea
          id="tentative diagnosi"
          placeholder="Tentative Diagnoses"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={tentativeDiagnoses}
          onChange={(e) => setTentativeDiagnoses(e.target.value)}
        ></textarea>
        <textarea
          id="management"
          placeholder="Management"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={management}
          onChange={(e) => setManagement(e.target.value)}
        ></textarea>
        <textarea
          id="diagnosis plan"
          placeholder="Diagnostic Plan"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={diagnosisPlan}
          onChange={(e) => setDiagnosisPlan(e.target.value)}
        ></textarea>
        <textarea
          id="advice to client"
          placeholder="Advice to Clients"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={adviceToClients}
          onChange={(e) => setAdviceToClients(e.target.value)}
        ></textarea>
        <textarea
          id="assistants"
          placeholder="Assistants"
          className="clash-font z-10 h-[24px] min-h-[158px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
          style={{ width: "100%", height: "24px" }}
          value={assistants}
          onChange={(e) => setAssistants(e.target.value)}
        ></textarea>
      </motion.div>
      <motion.div
        className="border-b"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      ></motion.div>
      <motion.div
        className="items-center gap-3 pt-5 max-md:px-3 md:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <p className="clash-font text-xl font-black text-black">Lab Result</p>
        <div className="mb-3 flex items-center gap-1">
          <p className="clash-font text-sm text-[#00000080] ">Select From Specific Lab and Fill in the results</p>
        </div>
      </motion.div>
      <motion.div
        className="w-full gap-4 pb-5  max-md:px-3 md:flex md:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <div className="mb-3 w-full">
          <div className="relative my-5  flex gap-3 ">
            <div className="flex ">
              <div className="clash-font flex items-center gap-2 rounded-s-md border bg-white px-3 py-2">
                <p className="text-sm text-[#4F4F4F]">Laboratory</p>
              </div>
              <div className="flex  cursor-pointer items-center justify-between gap-2 rounded-r-md border bg-[#ffffff] px-3">
                <p className="clash-font text-sm text-[#4F4F4F]">Microbilogy</p>
                <Image
                  src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/CaretDown.svg"
                  width={18}
                  height={18}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <textarea
              id="username"
              placeholder="Assistants"
              className="clash-font z-10 h-[24px] min-h-[98px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
              style={{ width: "100%", height: "24px" }}
            ></textarea>
            <div className="flex flex-col justify-between">
              <div>
                <Image src="./AuthImages/remove.svg" width={43} height={43} alt="" />
              </div>
              <Image src="./AuthImages/add.svg" width={43} height={43} alt="" />
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="relative my-5 flex gap-3 ">
            <div className="flex ">
              <div className="clash-font flex items-center gap-2 rounded-s-md border bg-white px-3 py-2">
                <p className="text-sm text-[#4F4F4F]">Laboratory</p>
              </div>
              <div className="flex  cursor-pointer items-center justify-between gap-2 rounded-r-md border bg-[#ffffff] px-3">
                <p className="clash-font text-sm text-[#4F4F4F]">Microbilogy</p>
                <Image
                  src="https://raw.githubusercontent.com/Dekatron322/vetlinks/81c86ade0ad897a2c063918fc20d3fc47af1eaa5/public/DashboardImages/CaretDown.svg"
                  width={18}
                  height={18}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <textarea
              id="username"
              placeholder="Assistants"
              className="clash-font z-10 h-[24px] min-h-[98px] w-full rounded-lg bg-transparent bg-white p-2 text-base outline-none focus:outline-none"
              style={{ width: "100%", height: "24px" }}
            ></textarea>
            <div className="flex flex-col justify-between">
              <div>
                <Image src="./AuthImages/remove.svg" width={43} height={43} alt="" />
              </div>
              <Image src="./AuthImages/add.svg" width={43} height={43} alt="" />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="flex w-full gap-4 pb-10 max-md:px-3 md:px-16"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 1 }}
      >
        <button
          onClick={submitCase}
          className="flex h-[42px] w-full items-center justify-center gap-2 rounded-md bg-[#1B5EED] "
        >
          <p className="text-white">Uploads Cases</p>
        </button>
      </motion.div>
    </section>
  )
}

export default UploadCases
