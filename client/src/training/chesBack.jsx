import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the ChestBackTraining component.
 *
 * @returns {JSX.Element} ChestBackTraining component.
 */
const ChestBackTraining = () => {
  return (
    <div id="chest-back-container">
      <h3>Chest and Back Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default ChestBackTraining;
