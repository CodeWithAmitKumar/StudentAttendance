import React from 'react';
import { BookOpen } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }: { 
  activeTab: string; 
  setActiveTab: (tab: string) => void 
}) {
  const tabs = ['Students', 'Subjects', 'Timetable', 'Attendance'];
  
  return (
    <nav className="bg-indigo-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">AttendanceHub</span>
        </div>
        <div className="flex gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab 
                  ? 'bg-white text-indigo-600' 
                  : 'hover:bg-indigo-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}