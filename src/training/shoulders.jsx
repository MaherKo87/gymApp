import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the ShouldersTraining component.
 *
 * @returns {JSX.Element} ShouldersTraining component.
 */
const ShouldersTraining = () => {
  return (
    <div>
      <h3>Shoulders Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default ShouldersTraining;
