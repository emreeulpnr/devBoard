import React from "react";
import { Task } from "@/types";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({ task, onToggle }) => {
  return (
    <div className="flex items-center justify-between bg-white border p-2 rounded-md shadow-sm">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      </label>
    </div>
  );
};

export default TaskItem;
