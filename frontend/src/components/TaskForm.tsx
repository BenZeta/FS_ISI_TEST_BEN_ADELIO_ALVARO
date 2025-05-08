import { useEffect, useState } from 'react';

interface Todo {
  id: number;
  task: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

interface TaskFormProps {
  editingTodo: Todo | null;
  onSubmit: (task: string) => void;
  onCancel: () => void;
}

export function TaskForm({ editingTodo, onSubmit, onCancel }: TaskFormProps) {
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    if (editingTodo) {
      setTaskInput(editingTodo.task);
    } else {
      setTaskInput('');
    }
  }, [editingTodo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    onSubmit(taskInput);
    setTaskInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="mb-4">
        <label
          htmlFor="task"
          className="block text-sm font-medium text-black mb-1"
        >
          Title
        </label>
        <input
          id="task"
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-full px-3 py-2 border border-[#D9D9D9] rounded-md shadow-sm focus:outline-none focus:ring-[#1890FF] focus:border-[#1890FF] text-black bg-white"
          placeholder="Enter task name"
        />
      </div>

      <div className="flex justify-center gap-3">
        {editingTodo ? (
          <>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1890FF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
            >
              Update Task
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-[#FF4D4F] text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="px-4 py-2 bg-[#1890FF] text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
          >
            Add Task
          </button>
        )}
      </div>
    </form>
  );
}
