import React, { useState, useEffect } from "react";
import { Todo, SortOrder } from "./types";
import { fetchTodos, addTodo, toggleTodo, deleteTodo } from "./api";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (title: string, dueDate: string) => {
    try {
      const newTodo = await addTodo(title, dueDate);
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      await toggleTodo(id, completed);
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
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
          <TodoForm onAdd={handleAddTodo} />
          <button
            onClick={sortTodos}
            className="mb-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Sort by Due Date ({sortOrder === "asc" ? "Ascending" : "Descending"}
            )
          </button>
          <ul className="divide-y divide-gray-200">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggleTodo}
                onDelete={handleDeleteTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
