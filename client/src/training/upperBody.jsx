import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the UpperbodyTraining component.
 *
 * @returns {JSX.Element} UpperbodyTraining component.
 */
const UpperbodyTraining = () => {
  return (
    <div>
      <h3>Upper Body Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default UpperbodyTraining;
