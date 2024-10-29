import Image from "next/image"
import React, { useEffect, useState } from "react"

interface Comment {
  id: number
  case: number
  app_user: number
  comment_text: string
  parent?: number
  created_at: string
  replies?: Comment[]
}

interface User {
  id: number
  name: string
}

const Usercomment = ({ caseId }: { caseId: number }) => {
  const [replyVisible, setReplyVisible] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [users, setUsers] = useState<{ [key: number]: string }>({})

  const handleReplyClick = () => {
    setReplyVisible(!replyVisible)
  }

  const handleCommentSubmit = async () => {
    const appUserId = localStorage.getItem("id")
    if (!appUserId) {
      setShowErrorNotification(true)
      return
    }

    const data = {
      case: caseId,
      app_user: parseInt(appUserId),
      comment_text: commentText,
    }

    try {
      const response = await fetch(`https://vet.fyber.site/cases/cases/${caseId}/comments/add/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to add comment.")
      }

      setCommentText("")
      setShowSuccessNotification(true)
      fetchComments()
    } catch (error) {
      console.error("Error adding comment:", error)
      setShowErrorNotification(true)
    }
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

  const fetchComments = async () => {
    try {
      const response = await fetch(`https://vet.fyber.site/cases/cases/${caseId}/comments/`)
      if (!response.ok) {
        throw new Error("Failed to fetch comments.")
      }
      const data = (await response.json()) as Comment[]
      setComments(data)
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch("https://vet.fyber.site/app_user/all/")
      if (!response.ok) {
        throw new Error("Failed to fetch users.")
      }
      const data = (await response.json()) as User[]

      const userMap = data.reduce((map: { [key: number]: string }, user: User) => {
        map[user.id] = user.name
        return map
      }, {})

      setUsers(userMap)
    } catch (error) {
      console.error("Error fetching users:", error)
    }
  }

  useEffect(() => {
    fetchComments()
    fetchUsers()
  }, [caseId])

  const getTimeElapsed = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (seconds < 60) return `${seconds} sec`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} mins`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours} hrs`
    const days = Math.floor(hours / 24)
    return `${days} days`
  }

  return (
    <div className="my-5 md:w-[30%]">
      {comments.map((comment) => (
        <div key={comment.id} className="flex items-start gap-4">
          <Image src="/DashboardImages/Round.svg" width={45.43} height={45.43} alt="User Avatar" />
          <div>
            <p className="clash-font text-base font-bold capitalize text-[#141619]">
              {users[comment.app_user] || "Unknown User"} · {getTimeElapsed(comment.created_at)}
            </p>
            <p className="clash-font mt-2">{comment.comment_text}</p>

            <button onClick={handleReplyClick} className="clash-font my-4 text-[#1B5EED] underline">
              Reply
            </button>

            {replyVisible && (
              <div className="mb-2">
                <input
                  type="text"
                  placeholder="Enter your reply..."
                  className="w-full rounded-md border p-2 focus:border-[#0000001A] focus:outline-none focus:ring-1"
                />
              </div>
            )}
          </div>
        </div>
      ))}
      <div className="my-5 ml-10 w-full border-b"></div>
      <textarea
        placeholder="Enter your comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full rounded-md border p-2 focus:outline-none focus:ring-1"
      />
      <button onClick={handleCommentSubmit} className="mt-2 rounded-md bg-blue-500 p-2 text-white">
        Submit
      </button>

      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-5 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#000000] bg-[#92E3A9] text-[#000000] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#000000]">Comment Sent</span>
          <Image src="/AuthImages/Star2.svg" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#D14343]">Failed to add comment. Please try again</span>
          <Image src="/AuthImages/failed.png" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
    </div>
  )
}

export default Usercomment
