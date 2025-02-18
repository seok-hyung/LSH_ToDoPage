'use client'

// import { useLocalStorage } from '@/hooks/useLocalStorage'

import { Board } from '@/types/board'
import { DraggableBoard } from '../board/draggable-board'
import { useEffect, useState } from 'react'

export const KanbanBoard: React.FC = () => {
  const initialBoards: Board[] = [
    {
      id: '1',
      title: '할일',
      tasks: [
        { id: 't1', content: '프로젝트 기획서 작성' },
        { id: 't2', content: '디자인 시안 검토' },
        { id: 't3', content: '회의 자료 준비' },
      ],
    },
    {
      id: '2',
      title: '진행중',
      tasks: [
        { id: 't4', content: '칸반보드 UI 개발' },
        { id: 't5', content: '로컬스토리지 구현' },
      ],
    },
    {
      id: '3',
      title: '완료',
      tasks: [{ id: 't6', content: '프로젝트 환경설정' }],
    },
  ]

  const [boards, setBoards] = useState<Board[]>([])

  useEffect(() => {
    const savedBoards = localStorage.getItem('boards')
    if (savedBoards) {
      setBoards(JSON.parse(savedBoards))
    } else {
      setBoards(initialBoards)
    }
  }, [])

  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem('boards', JSON.stringify(boards))
    }
  }, [boards])

  const moveBoard = (fromIndex: number, toIndex: number) => {
    const updatedBoards = [...boards]
    const [movedBoard] = updatedBoards.splice(fromIndex, 1)
    updatedBoards.splice(toIndex, 0, movedBoard)
    setBoards(updatedBoards)
  }

  const moveTask = (fromBoardId: string, toBoardId: string, taskId: string, toIndex: number) => {
    setBoards(prevBoards => {
      const newBoards = [...prevBoards]
      const fromBoard = newBoards.find(board => board.id === fromBoardId)
      const toBoard = newBoards.find(board => board.id === toBoardId)

      if (!fromBoard || !toBoard) return prevBoards

      const taskIndex = fromBoard.tasks.findIndex(task => task.id === taskId)
      if (taskIndex === -1) return prevBoards

      const [task] = fromBoard.tasks.splice(taskIndex, 1)
      toBoard.tasks.splice(toIndex, 0, task)

      return newBoards
    })
  }

  const addBoard = () => {
    const newBoard: Board = {
      id: Date.now().toString(),
      title: 'New Board',
      tasks: [],
    }
    setBoards([...boards, newBoard])
  }

  const editBoard = (boardId: string, newTitle: string) => {
    setBoards(prevBoards => prevBoards.map(board => (board.id === boardId ? { ...board, title: newTitle } : board)))
  }

  const deleteBoard = (boardId: string) => {
    setBoards(boards.filter(board => board.id !== boardId))
  }

  const addTask = (boardId: string) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              tasks: [...board.tasks, { id: Date.now().toString(), content: 'New Task' }],
            }
          : board
      )
    )
  }

  const editTask = (boardId: string, taskId: string, newContent: string) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.map(task => (task.id === taskId ? { ...task, content: newContent } : task)),
            }
          : board
      )
    )
  }

  const deleteTask = (boardId: string, taskId: string) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              tasks: board.tasks.filter(task => task.id !== taskId),
            }
          : board
      )
    )
  }

  return (
    <div className="flex gap-4 p-4">
      {boards.map((board, index) => (
        <DraggableBoard
          key={board.id}
          id={board.id}
          index={index}
          title={board.title}
          tasks={board.tasks}
          moveBoard={moveBoard}
          onEdit={newTitle => editBoard(board.id, newTitle)}
          onDelete={() => deleteBoard(board.id)}
          onAddTask={() => addTask(board.id)}
          onEditTask={(taskId, newContent) => editTask(board.id, taskId, newContent)}
          onDeleteTask={taskId => deleteTask(board.id, taskId)}
          moveTask={moveTask}
        />
      ))}
      <button
        onClick={addBoard}
        className="text-white p-4 rounded h-fit bg-blue-500 hover:bg-blue-600 transition-colors"
      >
        + Add Board
      </button>
    </div>
  )
}
