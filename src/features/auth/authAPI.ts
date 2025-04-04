import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface LoginData {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  token: string;
}

// Async thunk for login
export const loginUser = createAsyncThunk<ApiResponse<LoginData>, { email: string; password: string }>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log('Making login request to:', `${API_URL}/auth/login`);
      const response = await axios.post<ApiResponse<LoginData>>(`${API_URL}/auth/login`, credentials);
      console.log('Login response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk<ApiResponse<LoginData>, { firstName: string; lastName: string; email: string; password: string }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log('Making registration request to:', `${API_URL}/auth/register`);
      const response = await axios.post<ApiResponse<LoginData>>(`${API_URL}/auth/register`, userData);
      console.log('Registration response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Registration API error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);
