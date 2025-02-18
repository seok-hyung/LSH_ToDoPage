'use client'
import { useState, useRef, useEffect } from 'react'
import { TaskCardProps } from '@/types/task'

interface ExtendedTaskCardProps extends TaskCardProps {
  isNew?: boolean
}

export const TaskCard: React.FC<ExtendedTaskCardProps> = ({ content, onEdit, onDelete, isNew = false }) => {
  const [isEditing, setIsEditing] = useState(isNew)
  const [editedContent, setEditedContent] = useState(content)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    if (editedContent !== content) {
      onEdit(editedContent)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleBlur()
    }
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedContent}
          onChange={e => setEditedContent(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="할일을 입력하세요"
        />
      ) : (
        <div className="flex items-center justify-between p-3">
          <span
            onClick={() => setIsEditing(true)}
            className="flex-1 cursor-pointer hover:text-blue-600 transition-colors duration-200"
          >
            {content}
          </span>
          <button
            onClick={onDelete}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 p-1"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  )
}
