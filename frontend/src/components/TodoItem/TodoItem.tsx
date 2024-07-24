import React, { useState } from "react";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, dueDate: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(todo.id, editTitle, editDueDate);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <li className="py-4">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="flex-grow px-2 py-1 border rounded"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="px-2 py-1 border rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-2 py-1 rounded"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded"
          >
            Cancel
          </button>
        </form>
      </li>
    );
  }

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
        onClick={() => setIsEditing(true)}
        className="ml-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-bold py-1 px-2 rounded-full text-xs transition duration-300"
      >
        Edit
      </button>
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
