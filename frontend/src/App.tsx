import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import TodoFilter from "./components/TodoFilter/TodoFilter";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoItem from "./components/TodoItem/TodoItem";
import TodoList from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";

function App() {
  const {
    todos,
    isLoading,
    error,
    sortOrder,
    filter,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleEditTodo,
    sortTodos,
    setFilter,
  } = useTodos();

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
          <TodoForm onAdd={handleAddTodo} />
          <div className="md:flex gap-2">
            <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
            <button
              onClick={sortTodos}
              className="mb-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
            >
              Sort by Due Date (
              {sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
          </div>
          <TodoList
            isLoading={isLoading}
            todos={todos}
            onToggle={handleToggleTodo}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
