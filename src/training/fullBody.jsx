import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the FullBodyTraining component.
 *
 * @returns {JSX.Element} FullBodyTraining component.
 */
const FullBodyTraining = () => {
  return (
    <div>
      <h3>Full Body Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default FullBodyTraining;
