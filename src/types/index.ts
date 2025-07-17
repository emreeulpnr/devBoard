export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  tasks: Task[];
};
