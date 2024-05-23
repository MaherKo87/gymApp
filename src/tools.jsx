import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tools = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [workoutQuery, setWorkoutQuery] = useState('');
  const [exerciseQuery, setExerciseQuery] = useState('');
  const [workoutCount, setWorkoutCount] = useState(0);
  const [exerciseCount, setExerciseCount] = useState(0);
  const [totalSets, setTotalSets] = useState(0);
  const [totalReps, setTotalReps] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const navigate = useNavigate()

  const fetchWorkoutHistory = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user from local storage
    const userId = storedUser._id; // Get the user ID

    try {
      const response = await axios.get(`http://localhost:3000/workout/${userId}`);
      setWorkoutHistory(response.data.workouts);
      console.log('Fetched workout history:', response.data.workouts); // Debugging
      return response.data.workouts; // Return the fetched workout history
    } catch (error) {
      console.error('Error fetching workout history:', error);
      return []; // Return an empty array in case of error
    }
  };

  const showWorkoutHistory = async () => {
    await fetchWorkoutHistory();
    setShowHistory(true);
    setSearchResult(null); // Clear previous search result
  };

  const searchWorkoutsOrExercises = async (type) => {
    let history = workoutHistory;

    if (history.length === 0) {
      history = await fetchWorkoutHistory();
    }

    console.log('workoutHistory:', history); // Debugging

    // Normalize queries
    const normalizedWorkoutQuery = workoutQuery.trim().toLowerCase();
    const normalizedExerciseQuery = exerciseQuery.trim().toLowerCase();

    console.log('normalizedWorkoutQuery:', normalizedWorkoutQuery); // Debugging
    console.log('normalizedExerciseQuery:', normalizedExerciseQuery); // Debugging

    if (type === 'workout' && normalizedWorkoutQuery) {
      console.log('Searching workouts'); // Debugging
      const count = history.filter(workout => workout.workoutType && workout.workoutType.toLowerCase() === normalizedWorkoutQuery).length;
      setWorkoutCount(count);
      setSearchResult(`You trained ${workoutQuery} ${count} times.`);
      setWorkoutQuery(''); // Clear the workout query
    }

    if (type === 'exercise' && normalizedExerciseQuery) {
      console.log('Searching exercises'); // Debugging
      let count = 0;
      let sets = 0;
      let reps = 0;

      history.forEach(workout => {
        workout.exercises.forEach(exercise => {
          if (exercise.name && exercise.name.toLowerCase() === normalizedExerciseQuery) {
            count += 1;
            sets += exercise.sets.length;
            exercise.sets.forEach(set => {
              reps += set.reps;
            });
          }
        });
      });

      setExerciseCount(count);
      setTotalSets(sets);
      setTotalReps(reps);
      setSearchResult(`You trained ${exerciseQuery} ${count} times for a total of ${sets} sets and ${reps} reps.`);
      setExerciseQuery(''); // Clear the exercise query
    }

    setShowHistory(false); // Hide history to show only search result
  };
  const goHome = () => {
    navigate ('/homePage')
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter workout type (e.g., chest)"
          value={workoutQuery}
          onChange={(e) => setWorkoutQuery(e.target.value)}
        />
        <button onClick={() => searchWorkoutsOrExercises('workout')}>Search Workout</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter exercise name (e.g., bench press)"
          value={exerciseQuery}
          onChange={(e) => setExerciseQuery(e.target.value)}
        />
        <button onClick={() => searchWorkoutsOrExercises('exercise')}>Search Exercise</button>
      </div>
      {searchResult && <p>{searchResult}</p>}
      <button onClick={showWorkoutHistory}>Show Workout History</button>
      {showHistory && (
        <div>
          <h2>Workout History</h2>
          {workoutHistory.length === 0 ? (
            <p>No workouts found.</p>
          ) : (
            <ul>
              {workoutHistory.map((workout, index) => (
                <li key={index}>
                  <strong>Date:</strong> {workout.date}<br />
                  <strong>Workout Type:</strong> {workout.workoutType}<br />
                  <strong>Exercises:</strong>
                  <ul>
                    {workout.exercises.map((exercise, i) => (
                      <li key={i}>
                        {exercise.name}
                        <ul>
                          {exercise.sets.map((set, j) => (
                            <li key={j}>
                              Set {set.setNumber}: {set.kgs} kgs x {set.reps} reps
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <button onClick={goHome}>Home</button>
    </div>
  );
};

export default Tools;
