import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodosStart,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoStart,
  addTodoSuccess,
  addTodoFailure,
  updateTodoStart,
  updateTodoSuccess,
  updateTodoFailure,
  deleteTodoStart,
  deleteTodoSuccess,
  deleteTodoFailure,
} from "../features/todoSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  // State for new todo input
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState("");

  // Fetch todos
  const fetchTodos = async () => {
    dispatch(fetchTodosStart());
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }
      const data = await response.json();
      dispatch(fetchTodosSuccess(data));
    } catch (err) {
      dispatch(fetchTodosFailure(err.message));
    }
  };

  // Add a new todo
  const handleAddTodo = async () => {
    if (!newTodo) return; // Prevent adding empty todos
    dispatch(addTodoStart());
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo }),
      });
      const data = await response.json();
      dispatch(addTodoSuccess(data));
      setNewTodo(""); // Clear the input
    } catch (err) {
      dispatch(addTodoFailure(err.message));
    }
  };

  // Update a todo
  const handleUpdateTodo = async (todo) => {
    if (!updatedTodoTitle) return; // Prevent empty updates
    dispatch(updateTodoStart());
    try {
      const response = await fetch(`/api/todos/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, title: updatedTodoTitle }),
      });
      const data = await response.json();
      dispatch(updateTodoSuccess(data));
      setEditingTodo(null); // Exit editing mode
      setUpdatedTodoTitle(""); // Clear the input
    } catch (err) {
      dispatch(updateTodoFailure(err.message));
    }
  };

  // Delete a todo
  const handleDeleteTodo = async (id) => {
    dispatch(deleteTodoStart());
    try {
      await fetch(`/api/todos/${id}`, { method: "DELETE" });
      dispatch(deleteTodoSuccess(id));
    } catch (err) {
      dispatch(deleteTodoFailure(err.message));
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-w-6xl  py-10 px-6  mx-auto bg-[#0D0D0D] h-screen">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="w-full flex items-center justify-center gap-7 ">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="w-2/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button className="p-[3px] relative" onClick={handleAddTodo}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Add Todo
          </div>
        </button>
      </div>

      <ul className=" divide-y-2 divide-gray-200 dark:divide-gray-700 w-full flex flex-col items-center justify-center gap-3 mt-5 ">
        {todos.map((todo) => (
          <li key={todo._id} className="py-4 sm:pb-4 w-full max-w-3xl ">
            {editingTodo === todo._id ? (
              <>
                <div class="flex">
                  <div class="w-1/2 min-w-0 ">
                    <input
                      type="text"
                      value={updatedTodoTitle}
                      onChange={(e) => setUpdatedTodoTitle(e.target.value)}
                      placeholder="Update todo"
                      className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div class=" w-1/2 flex ml-24 justify-around items-center text-base font-semibold text-gray-900 dark:text-white">
                    <button
                      className="p-[3px] relative"
                      onClick={() => handleUpdateTodo(todo)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Update
                      </div>
                    </button>
                    <button
                      className="p-[3px] relative"
                      onClick={() => setEditingTodo(null)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Cancel
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex sm:pb-4 w-full max-w-3xl mx-10">
                  <div className="w-1/2 min-w-0 max-w-lg text-3xl font-semibold leading-normal text-white">
                    {todo.title}
                  </div>
                  <div className=" w-1/2 flex justify-around items-center text-base font-semibold text-white">
                    <button
                      className="p-[3px] relative"
                      onClick={() => {
                        setEditingTodo(todo._id);
                        setUpdatedTodoTitle(todo.title);
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Edit
                      </div>
                    </button>
                    <button
                      className="p-[3px] relative"
                      onClick={() => handleDeleteTodo(todo._id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                      <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                        Delete
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
