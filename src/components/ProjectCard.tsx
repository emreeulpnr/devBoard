import React from "react";
import { Project } from "@/types";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

type Props = {
  project: Project;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Link href={`/project/${project.id}`}>
      <div className="bg-white rounded-2xl shadow p-4 border hover:shadow-md transition cursor-pointer">
        <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <p className="text-xs text-gray-600 mb-4">
          {project.startDate} - {project.endDate}
        </p>
        <ProgressBar percentage={progress} />
        <p className="text-right text-xs text-gray-500 mt-1">{progress}% completed</p>
      </div>
    </Link>
  );
};

export default ProjectCard;

