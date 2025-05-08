import { TaskItem } from './TaskItem';

interface Todo {
  id: number;
  task: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskListProps {
  title: string;
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
}

export function TaskList({
  title,
  todos,
  onToggleComplete,
  onDelete,
  onEdit,
}: TaskListProps) {
  return (
    <div className="mb-6">
      <h2 className="font-medium text-lg text-black mb-2">{title}</h2>
      <div>
        {todos.length === 0 ? (
          <p className="text-[#8C8C8C] text-sm py-2">
            No {title.toLowerCase()}
          </p>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <TaskItem
                key={todo.id}
                todo={todo}
                onToggleComplete={onToggleComplete}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
