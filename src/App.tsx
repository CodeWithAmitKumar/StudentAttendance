import React, { useState } from 'react';
import Navbar from './components/Navbar';
import StudentList from './components/StudentList';
import SubjectList from './components/SubjectList';
import Timetable from './components/Timetable';
import AttendanceMarking from './components/AttendanceMarking';
import { Student, Subject, TimeSlot, AttendanceRecord } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('Students');
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto py-6">
        {activeTab === 'Students' && (
          <StudentList students={students} setStudents={setStudents} />
        )}
        {activeTab === 'Subjects' && (
          <SubjectList subjects={subjects} setSubjects={setSubjects} />
        )}
        {activeTab === 'Timetable' && (
          <Timetable
            subjects={subjects}
            timeSlots={timeSlots}
            setTimeSlots={setTimeSlots}
          />
        )}
        {activeTab === 'Attendance' && (
          <AttendanceMarking
            students={students}
            subjects={subjects}
            attendance={attendance}
            setAttendance={setAttendance}
          />
        )}
      </main>
    </div>
  );
}

export default App;