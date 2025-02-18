'use client'
import React from 'react'
import { useDrop } from 'react-dnd'
// import type { ConnectDropTarget } from 'react-dnd'
import { TaskListProps } from '@/types/task'
import { DraggableTask } from './draggable-task'

interface DragItem {
  id: string
  boardId: string
  index: number
}

export const TaskList: React.FC<TaskListProps> = ({ boardId, tasks, moveTask, onEditTask, onDeleteTask }) => {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'TASK',
    drop(item: DragItem) {
      if (item.boardId !== boardId) {
        moveTask(item.boardId, boardId, item.id, tasks.length)
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div ref={drop as unknown as React.RefObject<HTMLDivElement>} className="min-h-[200px] relative flex flex-col pb-8">
      <div className="flex-1 mb-8">
        {tasks.map((task, index) => (
          <DraggableTask
            key={task.id}
            id={task.id}
            content={task.content}
            boardId={boardId}
            index={index}
            moveTask={moveTask}
            onEdit={newContent => onEditTask(task.id, newContent)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </div>

      {tasks.length === 0 && isOver && (
        <div className="absolute inset-0 border-2 border-dashed border-blue-500 rounded-lg bg-blue-50 bg-opacity-50" />
      )}
    </div>
  )
}
