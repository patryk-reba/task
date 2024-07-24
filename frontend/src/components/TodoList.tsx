import React from "react";
import TodoItem from "./TodoItem/TodoItem";
import { useTodoContext } from "../context/useTodoContext";

const TodoList: React.FC = () => {
  const { todos, handleToggleTodo, handleDeleteTodo, handleEditTodo } =
    useTodoContext();

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
