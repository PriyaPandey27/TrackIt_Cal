import React from 'react';
import './Calendar.css';

export const NotesSection: React.FC = () => {
  const [notes, setNotes] = React.useState<string[]>(() => {
    const saved = localStorage.getItem('calendar_notes');
    return saved ? JSON.parse(saved) : Array(7).fill('');
  });

  const handleNoteChange = (index: number, value: string) => {
    const newNotes = [...notes];
    newNotes[index] = value;
    setNotes(newNotes);
    localStorage.setItem('calendar_notes', JSON.stringify(newNotes));
  };

  return (
    <div className="notes-section">
      <h3 className="notes-title">Notes</h3>
      <div className="notes-lines-container">
        {notes.map((note, index) => (
          <div key={index} className="note-line-wrapper">
             <input 
               type="text" 
               className="note-line-input" 
               placeholder="" 
               value={note}
               onChange={(e) => handleNoteChange(index, e.target.value)}
             />
          </div>
        ))}
      </div>
      <button 
        className="reset-btn" 
        onClick={() => {
          if (window.confirm('Are you sure you want to completely reset all calendar notes and selected dates?')) {
            localStorage.removeItem('calendar_notes');
            localStorage.removeItem('calendar_startDate');
            localStorage.removeItem('calendar_endDate');
            window.location.reload();
          }
        }}
        title="Clear all local data"
      >
        Reset Calendar Data
      </button>
    </div>
  );
};
