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
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row sm:items-center sm:space-x-2"
        >
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full sm:w-auto flex-grow px-2 py-1 border rounded mb-2 sm:mb-0"
          />
          <input
            type="date"
            value={editDueDate}
            onChange={(e) => setEditDueDate(e.target.value)}
            className="w-full sm:w-auto px-2 py-1 border rounded mb-2 sm:mb-0"
          />
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </li>
    );
  }

  return (
    <li className="py-4 flex flex-col sm:flex-row sm:items-center">
      <div className="flex items-center flex-grow mb-2 sm:mb-0">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, todo.completed)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <span
          className={`ml-3 ${
            todo.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {todo.title}
        </span>
      </div>
      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
        <span className="text-sm text-gray-500 mr-2 sm:mr-0">
          {new Date(todo.dueDate).toLocaleDateString()}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600 font-bold py-1 px-2 rounded-full text-xs transition duration-300"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="bg-red-100 hover:bg-red-200 text-red-600 font-bold py-1 px-2 rounded-full text-xs transition duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
