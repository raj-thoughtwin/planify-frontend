import axios from 'axios';
import { TaskCreate } from '../../utils/types/task.types';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// API functions
export const createTask = async (taskData: TaskCreate) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to create task' };
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to fetch tasks' };
  }
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  try {
    const response = await axios.patch(`${API_URL}/tasks/${taskId}/status`, 
      { status },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to update task status' };
  }
}; 