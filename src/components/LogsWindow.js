'use client'

import { useState, useEffect, useRef } from 'react'
import { getLogMessageList } from '@/actions/log-actions'

const LogsWindow = () => {
  const [logMessages, setLogMessages] = useState([])
  const textareaRef = useRef(null)

  useEffect(() => {
    const fetchLogMessages = async () => {
      const messages = await getLogMessageList(20)
      setLogMessages(
        messages.map((message) => (
          <div key={message._id} className="rounded-md text-xs text-slate-600">
            <span className="font-semibold text-gray-400">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
            <span> - </span>
            <span
              className={
                message.type === 'closed'
                  ? 'text-green-500'
                  : message.type === 'ERROR'
                    ? 'text-red-500'
                    : 'text-info'
              }>
              {message.message}
            </span>
          </div>
        ))
      )
    }

    fetchLogMessages()

    const interval = setInterval(fetchLogMessages, 10000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const scrollToBottom = () => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight
    }
  }

  useEffect(() => {
    // Scroll to the bottom when logMessages change
    scrollToBottom()
  }, [logMessages])

  return (
    <div className="card h-40 overflow-y-auto bg-base-100 p-4 shadow-xl">
      <div
        ref={textareaRef}
        className="card-body overflow-y-scroll bg-base-200">
        {logMessages}
      </div>
    </div>
  )
}

export default LogsWindow
