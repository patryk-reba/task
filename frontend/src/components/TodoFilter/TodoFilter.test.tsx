import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoFilter from "./TodoFilter";
import { FilterType } from "../../types";

describe("TodoFilter", () => {
  it("renders all filter buttons", () => {
    render(<TodoFilter currentFilter="all" onFilterChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Active" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Completed" })
    ).toBeInTheDocument();
  });

  it("highlights the current filter", () => {
    render(<TodoFilter currentFilter="active" onFilterChange={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Active" })).toHaveClass(
      "bg-indigo-500"
    );
  });

  it("calls onFilterChange when a filter is clicked", async () => {
    const mockOnFilterChange = vi.fn();
    render(
      <TodoFilter currentFilter="all" onFilterChange={mockOnFilterChange} />
    );

    const activeButton = screen.getByRole("button", { name: "Active" });
    await userEvent.click(activeButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith("active" as FilterType);
  });
});
