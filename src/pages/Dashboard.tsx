import { useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { Task } from '../utils/types';
import { fetchTasks, updateTask } from '../features/tasks/taskSlice';
import { TaskStatus } from '../utils/enums';
import TaskDragBoardComponent from '../components/TaskDragBoardComponent';
import { DragEndEvent } from "@dnd-kit/core";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks as { tasks: Task[]; loading: boolean; error: string | null });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    try {
      await dispatch(updateTask({ taskId, status: newStatus })).unwrap();
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
      <Box
        sx={{
          p: 4,
          height: '100%',
          width: '100%',
          bgcolor: '#f8fafc',
          overflow: 'auto',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 600,
            color: '#334155',
          }}
        >
          Dashboard
        </Typography>
        {tasks.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 4,
              textAlign: 'center',
            }}
          >
            No tasks available
          </Typography>
        ) : (
          <TaskDragBoardComponent tasks={tasks} onDragEnd={handleDragEnd} />
        )}
      </Box>
  );
};

export default Dashboard;
