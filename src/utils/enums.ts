export enum TaskType {
  BUG = 'bug',
  TASK = 'task',
  STORY = 'story'
}

export enum TaskPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low'
}

export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  CODE_REVIEW = 'Code Review',
  QA = 'QA (Deployed on Dev)'
}

// Helper function to get all enum values as an array
export const getEnumValues = <T extends { [key: string]: string }>(enumObj: T): string[] => {
  return Object.values(enumObj);
}; 