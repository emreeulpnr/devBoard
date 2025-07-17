'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Project, Task } from '@/types';
import TaskItem from '@/components/TaskItem';
import { v4 as uuidv4 } from 'uuid';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
  const storedProjects = JSON.parse(localStorage.getItem('devboard-projects') || '[]');
  console.log('Stored Projects:', storedProjects);
  console.log('URL ID:', id);

  const found = storedProjects.find((p: Project) => p.id === id);
  if (!found) {
    console.warn('No matching project found');
    return router.push('/');
  }
  setProject(found);
}, [id]);


  const updateLocalStorage = (updatedProject: Project) => {
    const storedProjects = JSON.parse(localStorage.getItem('devboard-projects') || '[]');
    const newProjects = storedProjects.map((p: Project) =>
      p.id === updatedProject.id ? updatedProject : p
    );
    localStorage.setItem('devboard-projects', JSON.stringify(newProjects));
  };

  const handleAddTask = () => {
    if (!project || !taskInput.trim()) return;

    const newTask: Task = {
      id: uuidv4(),
      title: taskInput.trim(),
      completed: false,
    };

    const updatedProject = {
      ...project,
      tasks: [...project.tasks, newTask],
    };

    setProject(updatedProject);
    updateLocalStorage(updatedProject);
    setTaskInput('');
  };

  const handleToggleTask = (taskId: string) => {
    if (!project) return;

    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    const updatedProject = { ...project, tasks: updatedTasks };
    setProject(updatedProject);
    updateLocalStorage(updatedProject);
  };

  if (!project) return <div className="p-6">Loading project...</div>;

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="border px-3 py-2 rounded w-full"
          placeholder="Add new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {project.tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={handleToggleTask} />
        ))}
      </div>
    </main>
  );
};

export default ProjectDetailPage;
