import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { useTodoContext } from "../context/useTodoContext";

const TodoList: React.FC = () => {
  const {
    todos,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    isLoading,
  } = useTodoContext();

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="rounded-full bg-slate-200 h-4 w-4"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="flex justify-between">
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-200">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
