"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

export default function CalendarPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const currentMonth = selectedDate.month();
  const currentYear = selectedDate.year();

  const daysInMonth = selectedDate.daysInMonth();
  const startDay = dayjs(`${currentYear}-${currentMonth + 1}-01`).day();

  const generateCalendar = () => {
    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    return [...blanks, ...days];
  };

  const handleDateClick = (day: number) => {
    if (day) {
      const newDate = dayjs(`${currentYear}-${currentMonth + 1}-${day}`);
      setSelectedDate(newDate);
      // Navigate to the page.tsx with the selected date as a query parameter
      router.push(`/booking?date=${newDate.format("YYYY-MM-DD")}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg flex overflow-hidden">
        {/* Left Panel */}
        <div className="bg-green-500 text-white w-1/3 p-6 flex flex-col justify-between">
          <div>
            <div className="text-6xl font-bold text-center">
              {selectedDate.date()}
            </div>
            <div className="text-2xl text-center mt-2">
              {selectedDate.format("dddd")}
            </div>
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2"></p>
              <ul className="text-sm space-y-1">
                
              </ul>
              <a href="#" className="underline text-sm mt-2 inline-block">
                
              </a>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-2/3 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {selectedDate.format("MMMM YYYY")}
            </h2>
            <div className="space-x-2">
              <button
                onClick={() => setSelectedDate(selectedDate.subtract(1, "month"))}
                className="text-gray-600 hover:text-black"
              >
                &lt;
              </button>
              <button
                onClick={() => setSelectedDate(selectedDate.add(1, "month"))}
                className="text-gray-600 hover:text-black"
              >
                &gt;
              </button>
            </div>
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {generateCalendar().map((day, index) => (
              <div
                key={index}
                className={`h-12 flex items-center justify-center rounded-lg text-sm cursor-pointer ${
                  day === selectedDate.date()
                    ? "bg-green-200 font-bold text-black"
                    : "hover:bg-gray-200 text-black"
                }`}
                onClick={() => handleDateClick(day!)}
              >
                {day || ""}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}