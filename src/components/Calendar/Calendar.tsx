import React, { useState } from 'react';
import './Calendar.css';
import { SpiralBinding } from './SpiralBinding';
import { HeroSection } from './HeroSection';
import { CalendarGrid } from './CalendarGrid';
import { NotesSection } from './NotesSection';

const THEMES = [
  { img: "https://picsum.photos/id/1011/2000/800", primary: "#1da1f2", light: "#e8f5fd" }, // Jan: Lake / Blue
  { img: "https://picsum.photos/id/1060/2000/800", primary: "#e64a19", light: "#fbe9e7" }, // Feb: Coffee / Orange
  { img: "https://picsum.photos/id/1080/2000/800", primary: "#c2185b", light: "#fce4ec" }, // Mar: Strawberries / Pink
  { img: "https://picsum.photos/id/1043/2000/800", primary: "#388e3c", light: "#e8f5e9" }, // Apr: Forest / Green
  { img: "https://picsum.photos/id/1015/2000/800", primary: "#00796b", light: "#e0f2f1" }, // May: Valley / Teal
  { img: "https://picsum.photos/id/1018/2000/800", primary: "#689f38", light: "#f1f8e9" }, // Jun: Mountains / LGreen
  { img: "https://picsum.photos/id/1021/2000/800", primary: "#afb42b", light: "#f9fbe7" }, // Jul: Trees / Lime
  { img: "https://picsum.photos/id/1025/2000/800", primary: "#fbc02d", light: "#fffde7" }, // Aug: Dog / Yellow
  { img: "https://picsum.photos/id/1029/2000/800", primary: "#455a64", light: "#eceff1" }, // Sep: NYC / BlueGrey
  { img: "https://picsum.photos/id/1035/2000/800", primary: "#0097a7", light: "#e0f7fa" }, // Oct: Waterfall / Cyan
  { img: "https://picsum.photos/id/1040/2000/800", primary: "#5d4037", light: "#efebe9" }, // Nov: Castle / Brown
  { img: "https://picsum.photos/id/1031/2000/800", primary: "#512da8", light: "#ede7f6" }, // Dec: Clouds / DeepPurple
];

export const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1));
  const [startDate, setStartDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem('calendar_startDate');
    return saved ? new Date(saved) : null;
  });
  const [endDate, setEndDate] = useState<Date | null>(() => {
    const saved = localStorage.getItem('calendar_endDate');
    return saved ? new Date(saved) : null;
  });
  const [isFlipping, setIsFlipping] = useState(false);

  React.useEffect(() => {
    if (startDate) localStorage.setItem('calendar_startDate', startDate.toISOString());
    else localStorage.removeItem('calendar_startDate');
    if (endDate) localStorage.setItem('calendar_endDate', endDate.toISOString());
    else localStorage.removeItem('calendar_endDate');
  }, [startDate, endDate]);

  const getThemeForMonth = (month: number) => THEMES[month % THEMES.length];
  const currentTheme = getThemeForMonth(currentDate.getMonth());

  const handleMonthChange = (offset: number) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
    }, 300); // Change the content halfway through the animation
    setTimeout(() => {
      setIsFlipping(false);
    }, 600);
  };


  const handleDateClick = (date: Date, isDragStart = false) => {
    if (isDragStart || !startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleDateDrag = (dragStart: Date, currentDragOver: Date) => {
     if (currentDragOver < dragStart) {
        setStartDate(currentDragOver);
        setEndDate(dragStart);
     } else {
        setStartDate(dragStart);
        setEndDate(currentDragOver);
     }
  };

  return (
    <div className="calendar-container" style={{ 
      '--color-primary': currentTheme.primary, 
      '--color-primary-light': currentTheme.light 
    } as React.CSSProperties}>
      <div className={`wall-calendar ${isFlipping ? 'is-animating' : ''}`}>
        <SpiralBinding holeCount={30} />
        
        <HeroSection 
          currentDate={currentDate} 
          onPrevMonth={() => handleMonthChange(-1)}
          onNextMonth={() => handleMonthChange(1)}
          imageUrl={currentTheme.img}
        />

        <div className="calendar-bottom-half">
          <NotesSection />
          <CalendarGrid 
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            onDateClick={handleDateClick}
            onDateDrag={handleDateDrag}
          />
        </div>
      </div>
    </div>
  );
};
