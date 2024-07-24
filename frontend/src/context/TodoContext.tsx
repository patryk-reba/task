import React, { createContext } from "react";
import { useTodos } from "../hooks/useTodos";
import { Todo, FilterType, SortOrder } from "../types";

export interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  sortOrder: SortOrder;
  filter: FilterType;
  handleAddTodo: (title: string, dueDate: string) => Promise<void>;
  handleToggleTodo: (id: number, completed: boolean) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  handleEditTodo: (id: number, title: string, dueDate: string) => Promise<void>;
  sortTodos: () => void;
  setFilter: (filter: FilterType) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const todoData = useTodos();

  return (
    <TodoContext.Provider value={todoData}>{children}</TodoContext.Provider>
  );
};
