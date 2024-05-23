import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the BackTraining component.
 *
 * @returns {JSX.Element} BackTraining component.
 */
const BackTraining = () => {
  return (
    <div>
      <h3>Back Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default BackTraining;
