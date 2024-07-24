import { Todo } from "./types";

const TODO_STORAGE_KEY = "todos";

export const saveTodosToLocalStorage = (todos: Todo[]): void => {
  localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
};

export const getTodosFromLocalStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);
  return storedTodos ? JSON.parse(storedTodos) : [];
};
