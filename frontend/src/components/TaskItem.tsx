import { format } from 'date-fns';
import { CheckCircle2, Circle, Pencil, Trash2 } from 'lucide-react';

interface Todo {
  id: number;
  task: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return format(date, 'dd MMM yyyy HH:mm');
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

export function TaskItem({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskItemProps) {
  return (
    <div className="bg-[#D9D9D9] rounded-md p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={
                  todo.is_completed ? 'text-black line-through' : 'text-black'
                }
              >
                {todo.task}
              </span>
              <button
                onClick={() => onEdit(todo)}
                className="text-black hover:text-[#1890FF] focus:outline-none"
              >
                <Pencil size={16} />
              </button>
            </div>
            <span className="text-[#8C8C8C] text-xs">
              {formatDate(todo.created_at)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onDelete(todo.id)}
            className="text-black hover:text-red-600 focus:outline-none"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={() => onToggleComplete(todo.id)}
            className={
              todo.is_completed
                ? 'text-[#1890FF] focus:outline-none'
                : 'text-black hover:text-[#1890FF] focus:outline-none'
            }
          >
            {todo.is_completed ? (
              <CheckCircle2 size={20} />
            ) : (
              <Circle size={20} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
