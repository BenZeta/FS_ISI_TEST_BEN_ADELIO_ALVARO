import { useEffect, useState } from 'react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';

interface Todo {
  id: number;
  task: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

// Use the environment variable with a fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    try {
      // Fetch active todos (oldest first)
      const activeTodosResponse = await fetch(
        `${API_URL}/todos/?completed=false`
      );

      if (!activeTodosResponse.ok) {
        throw new Error(`HTTP error! Status: ${activeTodosResponse.status}`);
      }

      const activeTodosData = await activeTodosResponse.json();
      setTodos(activeTodosData);

      // Fetch completed todos (newest first)
      const completedTodosResponse = await fetch(
        `${API_URL}/todos/?completed=true`
      );

      if (!completedTodosResponse.ok) {
        throw new Error(`HTTP error! Status: ${completedTodosResponse.status}`);
      }

      const completedTodosData = await completedTodosResponse.json();
      setCompletedTodos(completedTodosData);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateTodo = async (task: string) => {
    try {
      const response = await fetch(`${API_URL}/todos/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      });

      if (response.ok) {
        fetchTodos();
      } else {
        const errorData = await response.json().catch(() => null);
        console.error('Error response:', errorData);
      }
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const handleUpdateTodo = async (task: string) => {
    if (!editingTodo) return;

    try {
      const response = await fetch(`${API_URL}/todos/${editingTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task,
          is_completed: editingTodo.is_completed,
        }),
      });
      if (response.ok) {
        setEditingTodo(null);
        fetchTodos();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id: number) => {
    const todo = [...todos, ...completedTodos].find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          task: todo.task,
          is_completed: !todo.is_completed,
        }),
      });
      if (response.ok) {
        fetchTodos();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] py-8">
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            Task Management
          </h1>

          <TaskForm
            editingTodo={editingTodo}
            onSubmit={editingTodo ? handleUpdateTodo : handleCreateTodo}
            onCancel={handleCancelEdit}
          />

          <TaskList
            title="Ongoing Task"
            todos={todos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onEdit={setEditingTodo}
          />

          <TaskList
            title="Completed Task"
            todos={completedTodos}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onEdit={setEditingTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
