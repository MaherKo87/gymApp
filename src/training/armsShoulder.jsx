import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the ArmsShouldersTraining component.
 *
 * @returns {JSX.Element} ArmsShouldersTraining component.
 */
const ArmsShouldersTraining = () => {
  return (
    <div>
      <h3>Arms and Shoulders Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default ArmsShouldersTraining;
