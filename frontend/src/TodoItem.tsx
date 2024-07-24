import React from "react";
import { Todo } from "./types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="py-4 flex items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id, todo.completed)}
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <span
        className={`ml-3 flex-grow ${
          todo.completed ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        {todo.title}
      </span>
      <span className="text-sm text-gray-500">
        {new Date(todo.dueDate).toLocaleDateString()}
      </span>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold py-1 px-2 rounded-full text-xs transition duration-300"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
