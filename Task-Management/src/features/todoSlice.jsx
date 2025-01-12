import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import axios from 'axios';

const initialState = {
    todos : [],
    loading : false,
    error : null
}
const host = "http://localhost:5000";

// Fetch tasks from the backend (GET request)
export const getNotes = createAsyncThunk('todos/getNotes', async (_, { rejectWithValue }) => {
    try {
        const data = localStorage.getItem('dataWithTokenAndId');
        const localData = JSON.parse(data);
        const { token } = localData;
        const response = await fetch(`${host}/api/tasks/fetchTasks`, {
            method: "GET",
            headers: {
                "auth-token": token,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        //console.log(await response.json())
        return await response.json(); // Returns the tasks
    } catch (error) {
        return rejectWithValue(error.message); // Return error message
    }
});

// Add a new task (POST request)
export const addTask = createAsyncThunk('todos/addTask', async (description, { rejectWithValue }) => {
    try {
        const data = localStorage.getItem('dataWithTokenAndId');
        const localData = JSON.parse(data);
        const { token } = localData;
        const response = await fetch(`${host}/api/tasks/addTasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({ description })
        });
        const task = await response.json();
        return task; // Return the added task
    } catch (error) {
        return rejectWithValue(error.message); // Return error message
    }
});
// Add a new async thunk for deleting a task
export const deleteTask = createAsyncThunk(
    'todos/deleteTask',
    async (Id, { rejectWithValue }) => {
      try {
        const data = localStorage.getItem('dataWithTokenAndId');
        const localData = JSON.parse(data);
        const { token, user } = localData;
        const response = await fetch(`${host}/api/tasks/deleteTasks/${user}/${Id}`, {
          method: "DELETE",
          headers: {
            "auth-token": token,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to delete task");
        }
        //const result = await response.json();
        //console.log(result);
        return { Id }; // Return task ID to remove from the store
      } catch (error) {
        return rejectWithValue(error.message); // Return error message
      }
    }
  );

// Slice
const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        // Action to remove a task locally
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            // Handle getNotes (fetching tasks)
            .addCase( getNotes.pending, (state) => {
                state.loading = true;
            })
            .addCase( getNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload; // Save fetched task
            })
            .addCase( getNotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload; // Save error message
            })
            // Handle addTask (adding a new task)
            .addCase( addTask.fulfilled, (state, action) => {
                state.todos.push(action.payload); // Add new task to the list
            })
            // Handle deleteTask (deleting a task)
            .addCase(deleteTask.fulfilled, (state, action) => {
                // Remove task from the state
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.taskId);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.error = action.payload; // Save error message
            });
    }
});
export const { removeTodo } = todoSlice.actions;
export default todoSlice.reducer;