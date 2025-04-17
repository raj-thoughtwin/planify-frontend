export interface TaskBase {
  id:string
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  assignedTo: string;
  status: TaskStatus;
  assigneeDetails?: AssigneeDetails;
}

export interface AssigneeDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string; // Optional field for profile picture
}


export interface TaskCreate {
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  assignedTo: any;
  status: TaskStatus;
  assigneeDetails?: AssigneeDetails;
}

export interface Task extends TaskCreate {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: TaskStatus;
}

export interface TaskFormData {
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  assignedTo: string;
}

// Task type enum
export enum TaskType {
  BUG = 'bug',
  TASK = 'task',
  STORY = 'story',
}

// Task priority enum
export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

// Task status enum
export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  CODE_REVIEW = 'Code Review',
  QA = 'QA (Deployed on Dev)',
} 