import React from 'react';
import './Calendar.css';

interface CalendarGridProps {
  currentDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  onDateClick: (date: Date, isDragStart?: boolean) => void;
  onDateDrag: (dragStart: Date, currentDragOver: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({ currentDate, startDate, endDate, onDateClick, onDateDrag }) => {
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  const HOLIDAYS: Record<string, string> = {
    "1-1": "New Year's Day",
    "2-14": "Valentine's Day",
    "3-17": "St. Patrick's Day",
    "7-4": "Independence Day",
    "10-31": "Halloween",
    "12-25": "Christmas Day"
  };
  
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState<Date | null>(null);

  React.useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    return () => window.removeEventListener('mouseup', handleMouseUp);
  }, []);

  const handleMouseDown = (date: Date) => {
    setIsDragging(true);
    setDragStart(date);
    onDateClick(date, true);
  };

  const handleMouseEnter = (date: Date) => {
    if (isDragging && dragStart) {
      onDateDrag(dragStart, date);
    }
  };

  // Logic to generate the days in the month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => {
    let day = new Date(y, m, 1).getDay();
    return day === 0 ? 6 : day - 1; // Convert Sunday(0) to 6, Monday(1) to 0
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const daysInPrevMonth = getDaysInMonth(year, month - 1);
  
  const totalCells = 42; // 6 rows of 7 days
  const cells = [];

  for (let i = 0; i < totalCells; i++) {
    if (i < firstDay) {
      // Previous month padding
      const paddingDay = daysInPrevMonth - firstDay + i + 1;
      const date = new Date(year, month - 1, paddingDay);
      cells.push({ date, isPadding: true, dayNum: paddingDay });
    } else if (i < firstDay + daysInMonth) {
      // Current month days
      const currentDay = i - firstDay + 1;
      const date = new Date(year, month, currentDay);
      cells.push({ date, isPadding: false, dayNum: currentDay });
    } else {
      // Next month padding
      const paddingDay = i - (firstDay + daysInMonth) + 1;
      const date = new Date(year, month + 1, paddingDay);
      cells.push({ date, isPadding: true, dayNum: paddingDay });
    }
  }

  const isSameDay = (d1: Date, d2: Date | null) => {
    if (!d2) return false;
    return d1.getFullYear() === d2.getFullYear() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getDate() === d2.getDate();
  };

  const isBetween = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    return date > start && date < end;
  };

  return (
    <div className="calendar-grid-container">
      <div className="calendar-header-row">
        {daysOfWeek.map((day, idx) => (
          <div key={day} className={`day-name ${idx >= 5 ? 'weekend' : ''}`}>
            {day}
          </div>
        ))}
      </div>
      <div className="calendar-dates-grid">
        {cells.map((cell, index) => {
          const isStart = isSameDay(cell.date, startDate);
          const isEnd = isSameDay(cell.date, endDate);
          const inBetween = isBetween(cell.date, startDate, endDate);
          
          // Use the exact selection to provide visual states
          let selectionClass = '';
          if (isStart && !endDate) selectionClass = 'selected-start single';
          else if (isStart && endDate) selectionClass = 'selected-start range-start';
          else if (isEnd) selectionClass = 'selected-end range-end';
          else if (inBetween) selectionClass = 'selected-between';

          // Determine if day is weekend for coloring (Saturday, Sunday)
          const isWeekend = cell.date.getDay() === 0 || cell.date.getDay() === 6;
          const monthDateStr = `${cell.date.getMonth() + 1}-${cell.date.getDate()}`;
          const isHoliday = !cell.isPadding && HOLIDAYS[monthDateStr];

          return (
            <div 
              key={index} 
              className={`day-cell ${cell.isPadding ? 'padding-day' : 'current-month-day'} ${selectionClass} ${isHoliday ? 'has-holiday' : ''}`}
              onMouseDown={() => handleMouseDown(cell.date)}
              onMouseEnter={() => handleMouseEnter(cell.date)}
              onClick={() => {
                if (!isDragging) onDateClick(cell.date);
              }}
              title={isHoliday ? isHoliday : ''}
              draggable={false} /* Prevent default HTML5 drag logic */
            >
              <span className={`day-number ${isWeekend ? 'weekend-num' : ''}`}>
                {cell.dayNum}
              </span>
              {isHoliday && <div className="holiday-dot"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
