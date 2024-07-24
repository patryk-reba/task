import TodoFilter from "../TodoFilter/TodoFilter";
import { useTodoContext } from "../../context/useTodoContext";

const TodoControls = () => {
  const { filter, setFilter, sortOrder, sortTodos } = useTodoContext();

  return (
    <div className="md:flex gap-2">
      <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
      <button
        onClick={sortTodos}
        className="mb-6 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
      >
        Sort by Due Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>
    </div>
  );
};

export default TodoControls;
