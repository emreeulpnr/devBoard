'use client';

import React, { useState } from "react";
import { Project } from "@/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onAdd: (project: Project) => void;
  onClose: () => void;
};

const AddProjectModal: React.FC<Props> = ({ onAdd, onClose }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    if (!name || !startDate || !endDate) return alert("Zorunlu alanları doldurun.");

    const newProject: Project = {
      id: uuidv4(),
      name,
      description,
      startDate,
      endDate,
      tasks: [],
    };

    onAdd(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Yeni Proje Ekle</h2>
        <input
          className="w-full border px-3 py-2 rounded mb-2"
          type="text"
          placeholder="Proje Adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full border px-3 py-2 rounded mb-2"
          placeholder="Açıklama"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2 mb-4">
          <input
            type="date"
            className="w-1/2 border px-3 py-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className="w-1/2 border px-3 py-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>İptal</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleSubmit}>
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProjectModal;
