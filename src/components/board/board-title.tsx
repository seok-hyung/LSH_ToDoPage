'use client'
import { useState, useRef, useEffect } from 'react'
import { BoardCardProps } from '@/types/board'

export const BoardTitle: React.FC<BoardCardProps> = ({ title, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleBlur = () => {
    setIsEditing(false)
    if (editedTitle !== title) {
      onEdit(editedTitle)
    }
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      onDelete()
    }
  }

  return (
    <div className="flex justify-between items-center mb-2 group">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editedTitle}
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={handleBlur}
          className="w-full mr-2 p-1 border rounded focus:outline-none"
        />
      ) : (
        <>
          <h2 className="text-lg font-bold cursor-pointer" onClick={() => setIsEditing(true)}>
            {title}
          </h2>
          <button
            onClick={handleDelete}
            className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            ✖
          </button>
        </>
      )}
    </div>
  )
}
