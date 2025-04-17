import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Task, TaskCreate } from "../../utils/types/task.types";
import { createTask, getTasks, updateTaskStatus } from "./taskAPI";

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response: any = await getTasks();
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to fetch tasks");
    } catch (error: any) {
      console.error("Error fetching tasks:", error);
      return rejectWithValue(error.message || "Failed to fetch tasks");
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData: TaskCreate, { rejectWithValue }) => {
    try {
      const response: any = await createTask(taskData);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to create task");
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to create task");
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (
    { taskId, status }: { taskId: string; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response: any = await updateTaskStatus(taskId, status);
      if (response.success) {
        return response.data;
      }
      return rejectWithValue(response.message || "Failed to update task");
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update task");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add task
      .addCase(addTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.tasks.unshift(action.payload);
        }
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.tasks.findIndex(
            (task) => task.id === action.payload.id
          );
          if (index !== -1) {
            state.tasks[index] = action.payload;
          }
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = taskSlice.actions;
export default taskSlice.reducer;
