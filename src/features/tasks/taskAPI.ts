import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// Types
export interface TaskCreate {
  text: string;
  description: string;
  type: 'bug' | 'task' | 'story';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
  status: 'To Do' | 'In Progress' | 'Code Review' | 'QA (Deployed on Dev)';
}

export interface Task extends TaskCreate {
  id: string;
  createdAt: string;
  updatedAt: string;
}

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