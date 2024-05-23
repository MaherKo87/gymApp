import { useState } from 'react';
import ExerciseDetails from './exerciseDetails.jsx';

const predefinedExercises = [
  // Chest Exercises
  'Bar Dip', 'Bench Press', 'Cable Chest Press', 'Decline Bench Press', 'Dumbbell Chest Fly',
  'Dumbbell Chest Press', 'Dumbbell Decline Chest Press', 'Dumbbell Pullover', 'Incline Bench Press',
  'Incline Dumbbell Press', 'Incline Push-Up', 'Kneeling Push-Up', 'Machine Chest Fly', 'Machine Chest Press',
  'Push-Up', 'Smith Machine Bench Press', 'Smith Machine Incline Bench Press', 'Standing Cable Chest Fly',
  // Shoulder Exercises
  'Barbell Front Raise', 'Barbell Rear Delt Row', 'Barbell Upright Row', 'Cable Lateral Raise',
  'Dumbbell Front Raise', 'Dumbbell Lateral Raise', 'Dumbbell Rear Delt Row', 'Dumbbell Shoulder Press',
  'Face Pull', 'Machine Lateral Raise', 'Machine Shoulder Press', 'Overhead Press', 'Plate Front Raise',
  'Reverse Cable Flyes', 'Reverse Dumbbell Flyes', 'Reverse Machine Fly', 'Seated Dumbbell Shoulder Press',
  'Seated Barbell Overhead Press', 'Seated Smith Machine Shoulder Press',
  // Bicep Exercises
  'Barbell Curl', 'Barbell Preacher Curl', 'Cable Curl With Bar', 'Cable Curl With Rope', 'Concentration Curl',
  'Dumbbell Curl', 'Dumbbell Preacher Curl', 'Hammer Curl', 'Incline Dumbbell Curl', 'Machine Bicep Curl',
  'Spider Curl',
  // Triceps Exercises
  'Barbell Standing Triceps Extension', 'Barbell Lying Triceps Extension', 'Bench Dip', 'Close-Grip Push-Up',
  'Dumbbell Lying Triceps Extension', 'Dumbbell Standing Triceps Extension', 'Overhead Cable Triceps Extension',
  'Tricep Pushdown With Bar', 'Tricep Pushdown With Rope',
  // Leg Exercises
  'Barbell Lunge', 'Barbell Walking Lunge', 'Belt Squat', 'Body Weight Lunge', 'Bodyweight Leg Curl',
  'Box Squat', 'Bulgarian Split Squat', 'Chair Squat', 'Dumbbell Lunge', 'Dumbbell Squat', 'Front Squat',
  'Goblet Squat', 'Hack Squat Machine', 'Hip Adduction Machine', 'Jumping Lunge', 'Leg Extension',
  'Leg Press', 'Lying Leg Curl', 'Romanian Deadlift', 'Safety Bar Squat', 'Seated Leg Curl',
  'Shallow Body Weight Lunge', 'Side Lunges (Bodyweight)', 'Smith Machine Squat', 'Squat',
  // Calves Exercises
  'Seated Calf Raise', 'Standing Calf Raise',
  // Glute Exercises
  'Cable Pull Through', 'Dumbbell Romanian Deadlift', 'Glute Bridge', 'Hip Abduction Machine',
  'Hip Thrust', 'Hip Thrust Machine', 'Machine Glute Kickbacks', 'One-Legged Glute Bridge',
  'One-Legged Hip Thrust', 'Single Leg Romanian Deadlift', 'Standing Glute Kickback in Machine',
  // Back Exercises
  'Assisted Chin-Up', 'Assisted Pull-Up', 'Back Extension', 'Banded Muscle-Up', 'Barbell Row',
  'Barbell Shrug', 'Cable Close Grip Seated Row', 'Cable Wide Grip Seated Row', 'Chin-Up',
  'Deadlift', 'Dumbbell Deadlift', 'Dumbbell Row', 'Dumbbell Shrug', 'Inverted Row', 'Lat Pulldown',
  'Muscle-Up (Bar)', 'Muscle-Up (Rings)', 'One-Handed Cable Row', 'One-Handed Lat Pulldown',
  'Pendlay Row', 'Pull-Up', 'Pull-Up With a Neutral Grip', 'Seated Machine Row', 'Snatch',
  'Stiff-Legged Deadlift', 'Sumo Deadlift', 'T-Bar Row', 'Trap Bar Deadlift'
];

const ExerciseList = ({ onExerciseChosen }) => {
  const [filter, setFilter] = useState('');
  const [newExercise, setNewExercise] = useState('');
  const [exercises, setExercises] = useState(predefinedExercises);

  const handleInputChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  const handleAddExercise = () => {
    if (newExercise.trim()) {
      setExercises([...exercises, newExercise]);
      setNewExercise('');
      onExerciseChosen(newExercise)
    } else {
      alert('Please enter exercise name.');
    }
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.toLowerCase().includes(filter)
  );

  return (
    <div id="exercise-list-container">
      <input
        type="text"
        value={filter}
        onChange={handleInputChange}
        placeholder="Search for an exercise"
      />
      {filter && (
        <ul id="exercise-list">
          {filteredExercises.map((exercise, index) => (
            <li key={index} onClick={() => onExerciseChosen(exercise)}>
              {exercise}
            </li>
          ))}
        </ul>
      )}
      <p>or add your custom exercise</p>
      <input
        type="text"
        value={newExercise}
        onChange={(e) => setNewExercise(e.target.value)}
        placeholder="Add a new exercise"
      />
      <br />
      <button onClick={handleAddExercise}>Add New Exercise</button>
    </div>
  );
};

export default ExerciseList;
