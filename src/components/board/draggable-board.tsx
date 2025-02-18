'use client'
import { useDrag, useDrop } from 'react-dnd'
import { DraggableBoardProps } from '@/types/board'
import { BoardTitle } from './board-title'
import { TaskList } from '../task/task-list'

export const DraggableBoard: React.FC<DraggableBoardProps> = ({
  id,
  title,
  tasks,
  index,
  moveBoard,
  onEdit,
  onDelete,
  onAddTask,
  onEditTask,
  onDeleteTask,
  moveTask,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'BOARD',
    item: { id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'BOARD',
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveBoard(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: 'all 0.2s ease',
      }}
      className="bg-white rounded-lg shadow-md w-72 flex flex-col max-h-[80vh]"
    >
      <div
        ref={node => {
          if (node) {
            drag(drop(node))
          }
        }}
        className="p-3 border-b cursor-grab active:cursor-grabbing hover:bg-gray-50 transition-colors duration-200"
      >
        <BoardTitle title={title} onEdit={onEdit} onDelete={onDelete} />
      </div>
      <div className="flex-1 p-3">
        <TaskList boardId={id} tasks={tasks} moveTask={moveTask} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
      </div>
      <div className="p-3 border-t">
        <button
          onClick={onAddTask}
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-lg">+</span>
          <span>Add Task</span>
        </button>
      </div>
    </div>
  )
}
