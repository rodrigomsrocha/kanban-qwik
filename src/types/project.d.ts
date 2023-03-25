export interface Project {
  id: number;
  title: string;
  createdAt: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  tags: string[];
}

export interface ProjectAndTasks extends Project {
  tasks: Task[];
}
