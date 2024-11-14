export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  email: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
}

export interface AttendanceRecord {
  date: string;
  studentId: string;
  subjectId: string;
  status: 'present' | 'absent';
}