import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoApp from "./TodoApp";
import { TodoProvider } from "../../context/TodoContext";
import * as api from "../../services/api";

vi.mock("../../services/api");

const renderWithContext = (component: React.ReactNode) => {
  return render(<TodoProvider>{component}</TodoProvider>);
};

describe("TodoApp", () => {
  const mockTodos = [
    { id: 1, title: "Test Todo 1", completed: false, dueDate: "2023-07-01" },
    { id: 2, title: "Test Todo 2", completed: true, dueDate: "2023-07-02" },
  ];

  beforeEach(() => {
    vi.mocked(api.fetchTodos).mockResolvedValue(mockTodos);
  });

  it("renders the app title", () => {
    renderWithContext(<TodoApp />);
    expect(screen.getByText("What's on your mind?")).toBeInTheDocument();
  });

  it("fetches and displays todos", async () => {
    renderWithContext(<TodoApp />);
    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });
  });

  it("adds a new todo", async () => {
    vi.mocked(api.addTodo).mockResolvedValue({
      id: 3,
      title: "New Todo",
      completed: false,
      dueDate: "2023-07-03",
    });

    renderWithContext(<TodoApp />);

    const titleInput = screen.getByPlaceholderText("Enter a new task");
    const dateInput = screen.getByTestId("date");
    const addButton = screen.getByRole("button", { name: "Add Todo" });

    await userEvent.type(titleInput, "New Todo");
    await userEvent.type(dateInput, "2023-07-03");
    await userEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
  });

  it("filters todos", async () => {
    renderWithContext(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });

    const activeFilterButton = screen.getByRole("button", { name: "Active" });
    await userEvent.click(activeFilterButton);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Todo 2")).not.toBeInTheDocument();
  });

  it("toggles todo completion", async () => {
    renderWithContext(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    });

    const checkbox = screen.getAllByRole("checkbox")[0];
    await userEvent.click(checkbox);

    expect(api.toggleTodo).toHaveBeenCalledWith(1, false);
  });

  it("deletes a todo", async () => {
    renderWithContext(<TodoApp />);

    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByRole("button", { name: "Delete" })[0];
    await userEvent.click(deleteButton);

    expect(api.deleteTodo).toHaveBeenCalledWith(1);
  });
});
