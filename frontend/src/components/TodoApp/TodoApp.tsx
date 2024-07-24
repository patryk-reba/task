import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import TodoForm from "../TodoForm/TodoForm";
import TodoControls from "../TodoControls/TodoControls";
import TodoList from "../TodoList";
import { useTodoContext } from "../../context/useTodoContext";

const TodoApp: React.FC = () => {
  const { error } = useTodoContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1">
            Your Todo List
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            What's on your mind?
          </h1>
          {error && <ErrorMessage message={error} />}
          <TodoForm />
          <TodoControls />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
