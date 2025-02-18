export interface Task {
  id: string
  content: string
}

export interface TaskCardProps {
  content: string
  onEdit: (newContent: string) => void
  onDelete: () => void
}

export interface DraggableTaskProps extends TaskCardProps {
  id: string
  boardId: string
  index: number
  moveTask: (fromBoardId: string, toBoardId: string, taskId: string, toIndex: number) => void
  isLastItem?: boolean
}

export interface TaskListProps {
  boardId: string
  tasks: Task[]
  moveTask: (fromBoardId: string, toBoardId: string, taskId: string, toIndex: number) => void
  onEditTask: (taskId: string, newContent: string) => void
  onDeleteTask: (taskId: string) => void
}
