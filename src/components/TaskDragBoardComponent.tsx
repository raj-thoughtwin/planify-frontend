import React from "react";
import {
  Paper,
  Typography,
  Box,
  Chip,
  IconButton,
} from "@mui/material";
import {
  BugReport as BugIcon,
  Assignment as TaskIcon,
  Star as StoryIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";
import { TaskStatus } from '../utils/enums';
import { Task, TaskBase } from "../utils/types";

// Define types for columns and tasks
type ColumnType = TaskStatus;


const columns: ColumnType[] = Object.values(TaskStatus);

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'bug':
      return <BugIcon fontSize="small" sx={{ color: '#e53935' }} />;
    case 'story':
      return <StoryIcon fontSize="small" sx={{ color: '#1976d2' }} />;
    default:
      return <TaskIcon fontSize="small" sx={{ color: '#757575' }} />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return '#e53935';
    case 'medium':
      return '#fb8c00';
    case 'low':
      return '#757575';
    default:
      return '#757575';
  }
};

const TaskCard = ({ task }: { task: TaskBase }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <Paper
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        p: 2,
        mb: 2,
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        {getTypeIcon(task.type)}
        <Typography variant="subtitle1" sx={{ ml: 1, flex: 1 }}>
          {task.title}
        </Typography>
        <IconButton size="small">
          <MoreVertIcon />
        </IconButton>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        {task.description}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Chip
          label={task.type}
          size="small"
          sx={{
            bgcolor: getTypeIcon(task.type).props.sx.color,
            color: 'white',
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
        <Chip
          label={task.priority}
          size="small"
          sx={{
            bgcolor: getPriorityColor(task.priority),
            color: 'white',
            '& .MuiChip-label': {
              px: 1,
            },
          }}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          {task.assigneeDetails ? `${task.assigneeDetails.firstName} ${task.assigneeDetails.lastName}` : 'Unassigned'}
        </Typography>
      </Box>
    </Paper>
  );
};

const Column = ({ id, title, tasks }: { id: string; title: string; tasks: TaskBase[] }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Box
      ref={setNodeRef}
      sx={{
        flex: 1,
        minWidth: 300,
        bgcolor: '#f8fafc',
        p: 2,
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          color: '#334155',
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  );
};

interface TaskDragBoardComponentProps {
  tasks: Task[];
  onDragEnd: (event: DragEndEvent) => void;
}

const TaskDragBoardComponent: React.FC<TaskDragBoardComponentProps> = ({ tasks, onDragEnd }) => {
  return (
    <DndContext onDragEnd={onDragEnd}>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          pb: 2,
        }}
      >
        {columns.map((column) => (
          <Column
            key={column}
            id={column}
            title={column}
            tasks={tasks.filter((task) => task.status === column)}
          />
        ))}
      </Box>
    </DndContext>
  );
};

export default TaskDragBoardComponent; 