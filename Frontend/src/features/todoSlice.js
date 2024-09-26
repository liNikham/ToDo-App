import { createSlice } from "@reduxjs/toolkit";

// Initial State
const initialState = {
  todos: [],
  error: null,
  loading: false,
};

// Todo Slice
const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    fetchTodosStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.error = null;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
      state.error = null;
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const updatedTodo = action.payload;
      const existingTodo = state.todos.find((todo) => todo._id === updatedTodo._id);
      if (existingTodo) {
        existingTodo.title = updatedTodo.title;
        existingTodo.completed = updatedTodo.completed;
      }
    },
    updateTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTodoStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
      state.error = null;
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions
export const {
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
} = todoSlice.actions;

// Export reducer
export default todoSlice.reducer;
