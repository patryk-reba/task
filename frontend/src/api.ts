import axios from "axios";
import { Todo } from "./types";

const API_BASE_URL = "http://localhost:3001/api";

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get<Todo[]>(`${API_BASE_URL}/todos`);
  return response.data;
};

export const addTodo = async (
  title: string,
  dueDate: string
): Promise<Todo> => {
  const response = await axios.post<Todo>(`${API_BASE_URL}/todos`, {
    title,
    dueDate,
  });
  return response.data;
};

export const toggleTodo = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_BASE_URL}/todos/${id}`, {
    completed: !completed,
  });
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/todos/${id}`);
};

export const editTodo = async (
  id: number,
  title: string,
  dueDate: string
): Promise<Todo> => {
  const response = await axios.put<Todo>(`${API_BASE_URL}/todos/${id}`, {
    title,
    dueDate,
  });
  return response.data;
};
