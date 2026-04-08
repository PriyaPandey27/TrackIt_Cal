import React from 'react';
import './Calendar.css';

interface SpiralBindingProps {
  holeCount?: number;
}

export const SpiralBinding: React.FC<SpiralBindingProps> = ({ holeCount = 20 }) => {
  return (
    <div className="spiral-binding-container">
      {/* Top hanger triangle */}
      <div className="spiral-hanger"></div>
      
      <div className="spiral-rings">
        {Array.from({ length: holeCount }).map((_, i) => (
          <div key={i} className="spiral-ring">
            <div className="spiral-hole"></div>
            <div className="spiral-coil"></div>
            <div className="spiral-hole-bottom"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
