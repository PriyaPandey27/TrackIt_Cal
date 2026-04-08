import React from 'react';
import './Calendar.css';

interface HeroSectionProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  imageUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ currentDate, onPrevMonth, onNextMonth, imageUrl }) => {
  const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="hero-section">
      <div className="hero-image-wrapper">
        <img 
          src={imageUrl} 
          alt="Calendar hero" 
          className="hero-img"
        />
        {/* The zig zag / mountain shape overlay to create the bottom border effect */}
        <div className="hero-shape-overlay">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="shape-svg">
            <path d="M0,0 L0,20 L100,20 L100,0 L70,20 L30,0 L0,20 Z" fill="var(--color-primary)" />
            <path d="M0,0 L30,20 L75,0 L100,10 L100,0 L0,0 Z" fill="rgba(0,0,0,0)" />
            {/* The design has a very specific shape: blue solid background below the image with two sharp downward points forming a W like structure at the cutoff, but actually it's the image that is cut. Let's use a solid blue background for the container, and an image mask or clip path. */}
          </svg>
        </div>
      </div>
      
      {/* A blue angled banner section for Month/Year */}
      <div className="hero-month-banner">
         <button className="nav-btn prev-btn" aria-label="Previous month" onClick={onPrevMonth}>&#10094;</button>
         <div className="hero-month-text">
            <span className="hero-year">{currentYear}</span>
            <span className="hero-month">{currentMonth}</span>
         </div>
         <button className="nav-btn next-btn" aria-label="Next month" onClick={onNextMonth}>&#10095;</button>
      </div>
    </div>
  );
};
