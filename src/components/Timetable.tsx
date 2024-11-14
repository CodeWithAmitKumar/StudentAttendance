import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Subject, TimeSlot } from '../types';

export default function Timetable({
  subjects,
  timeSlots,
  setTimeSlots,
}: {
  subjects: Subject[];
  timeSlots: TimeSlot[];
  setTimeSlots: (timeSlots: TimeSlot[]) => void;
}) {
  const [newTimeSlot, setNewTimeSlot] = useState({
    day: '',
    startTime: '',
    endTime: '',
    subjectId: '',
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const addTimeSlot = () => {
    if (!newTimeSlot.day || !newTimeSlot.startTime || !newTimeSlot.endTime || !newTimeSlot.subjectId) return;
    
    setTimeSlots([
      ...timeSlots,
      {
        ...newTimeSlot,
        id: crypto.randomUUID(),
      },
    ]);
    setNewTimeSlot({ day: '', startTime: '', endTime: '', subjectId: '' });
  };

  const removeTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

  return (
    <div className="p-6">
      <div className="mb-6 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Time Slot</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            value={newTimeSlot.day}
            onChange={(e) => setNewTimeSlot({ ...newTimeSlot, day: e.target.value })}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Day</option>
            {days.map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
          <input
            type="time"
            value={newTimeSlot.startTime}
            onChange={(e) => setNewTimeSlot({ ...newTimeSlot, startTime: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="time"
            value={newTimeSlot.endTime}
            onChange={(e) => setNewTimeSlot({ ...newTimeSlot, endTime: e.target.value })}
            className="border rounded-lg px-3 py-2"
          />
          <select
            value={newTimeSlot.subjectId}
            onChange={(e) => setNewTimeSlot({ ...newTimeSlot, subjectId: e.target.value })}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={addTimeSlot}
          className="mt-4 flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="h-5 w-5" />
          Add Time Slot
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {timeSlots.map((slot) => (
              <tr key={slot.id}>
                <td className="px-6 py-4">{slot.day}</td>
                <td className="px-6 py-4">{slot.startTime}</td>
                <td className="px-6 py-4">{slot.endTime}</td>
                <td className="px-6 py-4">
                  {subjects.find((s) => s.id === slot.subjectId)?.name}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeTimeSlot(slot.id)}
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