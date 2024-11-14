import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Subject } from '../types';

export default function SubjectList({
  subjects,
  setSubjects,
}: {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
}) {
  const [newSubject, setNewSubject] = useState({
    name: '',
    code: '',
  });

  const addSubject = () => {
    if (!newSubject.name || !newSubject.code) return;
    
    setSubjects([
      ...subjects,
      {
        ...newSubject,
        id: crypto.randomUUID(),
      },
    ]);
    setNewSubject({ name: '', code: '' });
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Subject</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Subject Name"
            value={newSubject.name}
            onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Subject Code"
            value={newSubject.code}
            onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        <button
          onClick={addSubject}
          className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add Subject
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td className="px-6 py-4">{subject.name}</td>
                <td className="px-6 py-4">{subject.code}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeSubject(subject.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}