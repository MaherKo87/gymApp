import React from 'react';
import ExerciseList from './exerciseList.jsx'; // Assuming ExerciseList is a React component

/**
 * Represents the PushTraining component.
 *
 * @returns {JSX.Element} PushTraining component.
 */
const PushTraining = () => {
  return (
    <div>
      <h3>Push Training</h3>
      <div id="exercise-list-container">
        <ExerciseList />
      </div>
    </div>
  );
};

export default PushTraining;
