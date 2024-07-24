import { useState, useEffect } from "react";
import { Todo, SortOrder, FilterType } from "./types";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "./services/api";
import TodoItem from "./components/TodoItem/TodoItem";

import TodoFilter from "./components/TodoFilter/TodoFilter";

import {
  saveTodosToLocalStorage,
  getTodosFromLocalStorage,
} from "./utils/localStorageUtils";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import TodoForm from "./components/TodoForm/TodoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const storedTodos = getTodosFromLocalStorage();
        if (storedTodos.length > 0) {
          setTodos(storedTodos);
        } else {
          const fetchedTodos = await fetchTodos();
          setTodos(fetchedTodos);
        }
      } catch (error) {
        setError("Failed to fetch todos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  const handleAddTodo = async (title: string, dueDate: string) => {
    try {
      setError(null);
      const newTodo = await addTodo(title, dueDate);
      setTodos([...todos, newTodo]);
    } catch (error) {
      setError("Failed to add todo. Please try again.");
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      setError(null);
      await toggleTodo(id, completed);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      setError("Failed to update todo. Please try again.");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      setError(null);
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError("Failed to delete todo. Please try again.");
    }
  };

  const handleEditTodo = async (id: number, title: string, dueDate: string) => {
    try {
      setError(null);
      await editTodo(id, title, dueDate);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, title, dueDate } : todo
        )
      );
    } catch (error) {
      setError("Failed to edit todo. Please try again.");
    }
  };

  const sortTodos = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
    });
    setTodos(sortedTodos);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Your Todo List
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            What's on your mind?
          </h1>
          {error && <ErrorMessage message={error} />}
          <TodoForm onAdd={handleAddTodo} />
          <div className="md:flex gap-2">
            <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
            <button
              onClick={sortTodos}
              className="mb-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              aria-label={`Sort by Due Date (${
                sortOrder === "asc" ? "Ascending" : "Descending"
              })`}
            >
              Sort by Due Date (
              {sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
          {isLoading ? (
            <div className="text-center py-4" aria-live="polite">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500 mx-auto"></div>
              <p className="sr-only">Loading todos...</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200" aria-label="Todo list">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
