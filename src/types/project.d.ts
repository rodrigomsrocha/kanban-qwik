export interface Project {
  id: number;
  title: string;
  createdAt: string;
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
}

export interface TaskByStatus {
  todo: Task[];
  doing: Task[];
  done: Task[];
}

export interface CreateTaskData {
  title: string;
  projectId: number;
  description: string;
  tags: string[];
  status: string;
}

export interface ProjectAndTasks extends Project {
  tasks: Task[];
}
