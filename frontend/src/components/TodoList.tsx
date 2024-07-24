import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { Todo } from "./../types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, dueDate: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => (
  <ul className="divide-y divide-gray-200">
    {todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    ))}
  </ul>
);

export default TodoList;
