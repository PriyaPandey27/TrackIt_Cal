export interface CalendarDate {
  date: Date;
  isPadding: boolean;
  isToday: boolean;
  isSelectedStart: boolean;
  isSelectedEnd: boolean;
  isBetween: boolean;
}

export interface Note {
  id: string;
  text: string;
  date?: Date; // If it's attached to a specific date
}
