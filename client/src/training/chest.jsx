import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the ChestTraining component.
 *
 * @returns {JSX.Element} ChestTraining component.
 */
const ChestTraining = () => {
  return (
    <div>
      <h3>Chest Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default ChestTraining;
