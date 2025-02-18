import { Task } from './task'

export interface Board {
  id: string
  title: string
  tasks: Task[]
}

export interface KanbanBoardProps {
  boards: Board[]
  setBoards: (boards: Board[]) => void
}

export interface BoardCardProps {
  title: string
  onEdit: (newTitle: string) => void
  onDelete: () => void
}

export interface DraggableBoardProps extends BoardCardProps {
  id: string
  index: number
  tasks: Task[]
  moveBoard: (fromIndex: number, toIndex: number) => void
  onAddTask: () => void
  onEditTask: (taskId: string, newContent: string) => void
  onDeleteTask: (taskId: string) => void
  moveTask: (fromBoardId: string, toBoardId: string, taskId: string, toIndex: number) => void
}
