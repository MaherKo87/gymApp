import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the ArmsTraining component.
 *
 * @returns {JSX.Element} ArmsTraining component.
 */
const ArmsTraining = () => {
  return (
    <div>
      <h3>Arms Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default ArmsTraining;
