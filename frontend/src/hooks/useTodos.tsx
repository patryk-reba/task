import { useState, useEffect } from "react";
import { Todo, SortOrder, FilterType } from "../types";
import {
  fetchTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  editTodo,
} from "../services/api";

export const useTodos = () => {
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
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        setError("Failed to fetch todos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadTodos();
  }, []);

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
    const sortedTodos = todos.sort((a, b) => {
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

  return {
    todos: filteredTodos,
    isLoading,
    error,
    sortOrder,
    filter,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    sortTodos,
    setFilter,
  };
};
