# Interactive Wall Calendar

A beautiful, interactive, poster-style wall calendar built with React, TypeScript, and Vite. This project provides a visually appealing calendar interface inspired by physical spiral-bound wall calendars, complete with monthly themes, notes, and drag-to-select functionality.

## Features & Functions Provided

- **Classic Wall Calendar Layout**: Designed to look like a real physical wall calendar, complete with a visual spiral binding and a top-half image hero section.
- **Dynamic Monthly Theming**: Each month features a unique background image synced organically with a matched CSS color palette (primary and light themes).
- **Interactive Date Selection**:
  - **Click to Select**: Click a single date, or click a start and end date to select a range.
  - **Drag-to-Select**: Intuitive mouse drag support to easily highlight a continuous block of dates.
- **Persistent State Storage**: The selected start and end dates are specifically saved to the browser's `localStorage` so your calendar setup stays intact after page reloads.
- **Page Flip Animations**: Smooth, engaging visual transitions when clicking the previous and next month buttons to simulate flipping the page.
- **Notes Section**: Contains a functional side space that mimics the traditional open area for personal notes or bullet journaling.
- **Optimized Responsive Viewport**: Styled properly via CSS flexbox and grid layouts so all calendar dates and the hero image maintain visibility without being clipped at the bottom.

## Tech Stack

- **Framework**: React
- **Language**: TypeScript
- **Tooling**: Vite
- **Styling**: Vanilla CSS (using CSS Custom Properties for dynamic styling)

## Getting Started

First, ensure you have Node.js installed.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

---

*This project was bootstrapped using the standard Vite + React + TypeScript template.*
