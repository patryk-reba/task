import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoForm from "./TodoForm";
import { TodoContext } from "../../context/TodoContext";

// Mock the useTodoContext hook
vi.mock("../../context/useTodoContext", () => ({
  useTodoContext: () => ({
    handleAddTodo: vi.fn(),
  }),
}));

describe("TodoForm", () => {
  const mockHandleAddTodo = vi.fn();

  beforeEach(() => {
    // Reset the mock before each test
    mockHandleAddTodo.mockReset();
  });

  const renderWithContext = () => {
    return render(
      <TodoContext.Provider value={{ handleAddTodo: mockHandleAddTodo } as any}>
        <TodoForm />
      </TodoContext.Provider>
    );
  };

  it("renders the form elements correctly", () => {
    renderWithContext();

    expect(screen.getByPlaceholderText("Enter a new task")).toBeInTheDocument();
    expect(screen.getByTestId("date")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Todo" })
    ).toBeInTheDocument();
  });

  it("updates title input value when typed", async () => {
    renderWithContext();
    const titleInput = screen.getByPlaceholderText("Enter a new task");

    await userEvent.type(titleInput, "New Todo Item");
    expect(titleInput).toHaveValue("New Todo Item");
  });

  it("updates date input value when changed", async () => {
    renderWithContext();
    const dateInput = screen.getByTestId("date");

    await userEvent.type(dateInput, "2023-07-15");
    expect(dateInput).toHaveValue("2023-07-15");
  });

  it("clears inputs after form submission", async () => {
    renderWithContext();
    const titleInput = screen.getByPlaceholderText("Enter a new task");
    const dateInput = screen.getByTestId("date");
    const submitButton = screen.getByRole("button", { name: "Add Todo" });

    await userEvent.type(titleInput, "New Todo Item");
    await userEvent.type(dateInput, "2023-07-15");
    await userEvent.click(submitButton);

    expect(titleInput).toHaveValue("");
    expect(dateInput).toHaveValue("");
  });

  it("prevents form submission if title is empty", async () => {
    renderWithContext();
    const dateInput = screen.getByTestId("date");
    const submitButton = screen.getByRole("button", { name: "Add Todo" });

    await userEvent.type(dateInput, "2023-07-15");
    await userEvent.click(submitButton);

    expect(mockHandleAddTodo).not.toHaveBeenCalled();
  });

  it("prevents form submission if date is empty", async () => {
    renderWithContext();
    const titleInput = screen.getByPlaceholderText("Enter a new task");
    const submitButton = screen.getByRole("button", { name: "Add Todo" });

    await userEvent.type(titleInput, "New Todo Item");
    await userEvent.click(submitButton);

    expect(mockHandleAddTodo).not.toHaveBeenCalled();
  });
});
