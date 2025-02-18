'use client'
import { useDrag, useDrop } from 'react-dnd'
import { DraggableTaskProps } from '@/types/task'
import { TaskCard } from './task-card'
import { useRef } from 'react'

interface DragItem {
  id: string
  boardId: string
  index: number
}

export const DraggableTask: React.FC<DraggableTaskProps> = ({
  id,
  content,
  boardId,
  index,
  moveTask,
  onEdit,
  onDelete,
  isLastItem,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id, boardId, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'TASK',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      // 자기 자신 위에 드롭하는 경우 무시
      if (dragIndex === hoverIndex && item.boardId === boardId) {
        return
      }

      // 드래그 아이템의 위치를 결정
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // 위로 드래그할 때
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // 아래로 드래그할 때
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      moveTask(item.boardId, boardId, item.id, hoverIndex)
      item.index = hoverIndex
      item.boardId = boardId
    },
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : 'auto',
        margin: isDragging ? 0 : undefined,
        padding: isDragging ? 0 : undefined,
      }}
      className={`relative select-none ${isLastItem ? 'mb-0' : 'mb-2'} transition-all duration-200`}
    >
      {isOver && <div className={`absolute ${isLastItem ? 'bottom-0' : '-top-1'} left-0 right-0 h-0.5 bg-blue-500`} />}
      <TaskCard content={content} onEdit={onEdit} onDelete={onDelete} />
    </div>
  )
}
