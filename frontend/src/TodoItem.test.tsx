import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";

describe("TodoItem", () => {
  const mockTodo = {
    id: 1,
    title: "Test Todo",
    completed: false,
    dueDate: "2023-07-01",
  };

  it("renders todo item", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByText("7/1/2023")).toBeInTheDocument();
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const mockOnToggle = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledWith(1, false);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const mockOnDelete = vi.fn();
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={mockOnDelete}
        onEdit={vi.fn()}
      />
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await userEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("enters edit mode when edit button is clicked", async () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={vi.fn()}
        onDelete={vi.fn()}
        onEdit={vi.fn()}
      />
    );

    const editButton = screen.getByRole("button", { name: "Edit" });
    await userEvent.click(editButton);

    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2023-07-01")).toBeInTheDocument();
  });
});
