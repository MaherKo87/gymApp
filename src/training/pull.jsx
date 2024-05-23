import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the PullTraining component.
 *
 * @returns {JSX.Element} PullTraining component.
 */
const PullTraining = () => {
  return (
    <div>
      <h3>Pull Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default PullTraining;
