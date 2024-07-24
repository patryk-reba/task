import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { fetchTodos, addTodo, toggleTodo, deleteTodo, editTodo } from "./api";

vi.mock("axios");

describe("API functions", () => {
  it("fetchTodos calls axios and returns todos", async () => {
    const todos = [
      { id: 1, title: "Test Todo", completed: false, dueDate: "2023-07-01" },
    ];
    vi.mocked(axios.get).mockResolvedValue({ data: todos });

    const result = await fetchTodos();
    expect(result).toEqual(todos);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3001/api/todos");
  });

  it("addTodo calls axios with the correct payload", async () => {
    const newTodo = {
      id: 1,
      title: "New Todo",
      completed: false,
      dueDate: "2023-07-01",
    };
    vi.mocked(axios.post).mockResolvedValue({ data: newTodo });

    const result = await addTodo("New Todo", "2023-07-01");
    expect(result).toEqual(newTodo);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3001/api/todos", {
      title: "New Todo",
      dueDate: "2023-07-01",
    });
  });

  it("toggleTodo calls axios with the correct payload", async () => {
    const updatedTodo = {
      id: 1,
      title: "Test Todo",
      completed: true,
      dueDate: "2023-07-01",
    };
    vi.mocked(axios.put).mockResolvedValue({ data: updatedTodo });

    const result = await toggleTodo(1, false);
    expect(result).toEqual(updatedTodo);
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3001/api/todos/1",
      { completed: true }
    );
  });

  it("deleteTodo calls axios with the correct id", async () => {
    vi.mocked(axios.delete).mockResolvedValue({});

    await deleteTodo(1);
    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:3001/api/todos/1"
    );
  });

  it("editTodo calls axios with the correct payload", async () => {
    const updatedTodo = {
      id: 1,
      title: "Updated Todo",
      completed: false,
      dueDate: "2023-07-02",
    };
    vi.mocked(axios.put).mockResolvedValue({ data: updatedTodo });

    const result = await editTodo(1, "Updated Todo", "2023-07-02");
    expect(result).toEqual(updatedTodo);
    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:3001/api/todos/1",
      { title: "Updated Todo", dueDate: "2023-07-02" }
    );
  });
});
