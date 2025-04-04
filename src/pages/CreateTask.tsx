import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { addTask } from '../features/tasks/taskSlice';
import { TaskType, TaskPriority, TaskStatus, getEnumValues } from '../utils/enums';
import { TaskFormData, TaskCreate } from '../utils/types/task.types';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.tasks || { loading: false, error: null });

  const [formData, setFormData] = useState<TaskFormData>({
    text: '',
    description: '',
    type: TaskType.TASK,
    priority: TaskPriority.MEDIUM,
    assignee: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const taskData: TaskCreate = {
        ...formData,
        status: TaskStatus.TODO,
      };
      
      await dispatch(addTask(taskData)).unwrap();
      showSuccessToast('Task created successfully!');
      navigate('/dashboard');
    } catch (err: any) {
      showErrorToast(err.message || 'Failed to create task');
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600, color: '#334155' }}>
          Create New Task
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="text"
            value={formData.text}
            onChange={handleChange}
            sx={{ mb: 3 }}
            required
            placeholder="Enter task title"
            disabled={loading}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={4}
            sx={{ mb: 3 }}
            required
            placeholder="Enter task description"
            disabled={loading}
          />

          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <FormControl fullWidth required>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={formData.type}
                label="Type"
                onChange={handleChange}
                disabled={loading}
              >
                {getEnumValues(TaskType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth required>
              <InputLabel>Priority</InputLabel>
              <Select
                name="priority"
                value={formData.priority}
                label="Priority"
                onChange={handleChange}
                disabled={loading}
              >
                {getEnumValues(TaskPriority).map((priority) => (
                  <MenuItem key={priority} value={priority}>
                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            fullWidth
            label="Assignee"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
            sx={{ mb: 4 }}
            required
            placeholder="Enter assignee name"
            disabled={loading}
          />

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/dashboard')}
              sx={{
                borderColor: '#e2e8f0',
                color: '#64748b',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: '#f8fafc',
                },
              }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: '#3b82f6',
                '&:hover': {
                  bgcolor: '#2563eb',
                },
              }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Task'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default CreateTask; 