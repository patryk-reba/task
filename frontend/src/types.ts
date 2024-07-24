export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
}

export type SortOrder = "asc" | "desc";

export type FilterType = "all" | "active" | "completed";
