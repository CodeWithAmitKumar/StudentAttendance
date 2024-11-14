import React, { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Student } from '../types';

export default function StudentList({ 
  students, 
  setStudents 
}: {
  students: Student[];
  setStudents: (students: Student[]) => void;
}) {
  const [newStudent, setNewStudent] = useState({
    name: '',
    rollNumber: '',
    email: '',
  });

  const addStudent = () => {
    if (!newStudent.name || !newStudent.rollNumber || !newStudent.email) return;
    
    setStudents([
      ...students,
      {
        ...newStudent,
        id: crypto.randomUUID(),
      },
    ]);
    setNewStudent({ name: '', rollNumber: '', email: '' });
  };

  const removeStudent = (id: string) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Student</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newStudent.name}
            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="text"
            placeholder="Roll Number"
            value={newStudent.rollNumber}
            onChange={(e) => setNewStudent({ ...newStudent, rollNumber: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={newStudent.email}
            onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
        </div>
        <button
          onClick={addStudent}
          className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4">{student.name}</td>
                <td className="px-6 py-4">{student.rollNumber}</td>
                <td className="px-6 py-4">{student.email}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeStudent(student.id)}
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