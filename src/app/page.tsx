'use client';

import { useState, useEffect } from "react";
import { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard";
import AddProjectModal from "@/components/AddProjectModal";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedProjects = JSON.parse(localStorage.getItem('devboard-projects') || '[]');
    setProjects(savedProjects);
  }, []);

  const handleAddProject = (project: Project) => {
  setProjects((prev) => {

    const exists = prev.some(p => p.id === project.id);
    if (exists) return prev;

    const newProjects = [...prev, project];
    localStorage.setItem('devboard-projects', JSON.stringify(newProjects));
    return newProjects;
  });
};
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">DevBoard</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          onClick={() => setShowModal(true)}
        >
          + Add Project
        </button>
      </div>

      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {showModal && (
        <AddProjectModal
          onAdd={handleAddProject}
          onClose={() => setShowModal(false)}
        />
      )}
    </main>
  );
}
