import { useEffect, useState } from "react"

interface TabProps {
  label: string
  onClick: () => void
  active: boolean
}

const Tab: React.FC<TabProps> = ({ label, onClick, active }) => {
  const [isMobile, setIsMobile] = useState(false)

  // Check the window width on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768) // Set true for mobile screen sizes
    }

    handleResize() // Initial check
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Truncate label to the first word on mobile screens
  const displayLabel = isMobile ? label.split(" ")[0] : label

  return (
    <button
      onClick={onClick}
      className={` py-2 focus:outline-none max-md:text-xs md:px-4 ${
        active ? "border-b-2 border-[#1B5EED] font-black text-[#1B5EED]" : "font-medium text-[#000000]"
      }`}
    >
      {displayLabel}
    </button>
  )
}

export default Tab
