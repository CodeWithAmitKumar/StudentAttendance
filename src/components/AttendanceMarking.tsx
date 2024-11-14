import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Student, Subject, AttendanceRecord } from '../types';

export default function AttendanceMarking({
  students,
  subjects,
  attendance,
  setAttendance,
}: {
  students: Student[];
  subjects: Subject[];
  attendance: AttendanceRecord[];
  setAttendance: (attendance: AttendanceRecord[]) => void;
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSubject, setSelectedSubject] = useState('');

  const toggleAttendance = (studentId: string, status: 'present' | 'absent') => {
    const existingRecord = attendance.find(
      (record) =>
        record.date === selectedDate &&
        record.studentId === studentId &&
        record.subjectId === selectedSubject
    );

    if (existingRecord) {
      setAttendance(
        attendance.map((record) =>
          record.date === selectedDate &&
          record.studentId === studentId &&
          record.subjectId === selectedSubject
            ? { ...record, status }
            : record
        )
      );
    } else {
      setAttendance([
        ...attendance,
        {
          date: selectedDate,
          studentId,
          subjectId: selectedSubject,
          status,
        },
      ]);
    }
  };

  const getAttendanceStatus = (studentId: string) => {
    return attendance.find(
      (record) =>
        record.date === selectedDate &&
        record.studentId === studentId &&
        record.subjectId === selectedSubject
    )?.status;
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedSubject && (
        <div className="bg-white rounded-lg shadow-md">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4">{student.name}</td>
                  <td className="px-6 py-4">{student.rollNumber}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleAttendance(student.id, 'present')}
                        className={`p-2 rounded-lg ${
                          getAttendanceStatus(student.id) === 'present'
                            ? 'bg-green-100 text-green-600'
                            : 'hover:bg-green-100 text-gray-400'
                        }`}
                      >
                        <Check className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => toggleAttendance(student.id, 'absent')}
                        className={`p-2 rounded-lg ${
                          getAttendanceStatus(student.id) === 'absent'
                            ? 'bg-red-100 text-red-600'
                            : 'hover:bg-red-100 text-gray-400'
                        }`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}