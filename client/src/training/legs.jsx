import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the LegsTraining component.
 *
 * @returns {JSX.Element} LegsTraining component.
 */
const LegsTraining = () => {
  return (
    <div>
      <h3>Legs Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default LegsTraining;
