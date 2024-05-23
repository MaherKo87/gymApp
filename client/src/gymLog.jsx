import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChestTraining from '../src/training/chest.jsx';
import BackTraining from '../src/training/back.jsx';
import ArmsTraining from '../src/training/arms.jsx';
import ShouldersTraining from '../src/training/shoulders.jsx';
import LegsTraining from '../src/training/legs.jsx';
import PushTraining from '../src/training/push.jsx';
import PullTraining from '../src/training/pull.jsx';
import ChestBackTraining from '../src/training/chesBack.jsx';
import ArmsShouldersTraining from '../src/training/armsShoulder.jsx';
import UpperbodyTraining from '../src/training/upperBody.jsx';
import FullBodyTraining from '../src/training/fullBody.jsx';
import ExerciseDetails from '../src/training/exerciseDetails.jsx';
import ExerciseList from '../src/training/exerciseList.jsx';
import WelcomeUser from '../src/welcomeUser.jsx';

const GymLog = () => {
  const navigate = useNavigate();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [showExerciseList, setShowExerciseList] = useState(false);
  const [showExerciseDetails, setShowExerciseDetails] = useState(false);
  const [userName, setUserName] = useState('User');
  const [exercises, setExercises] = useState([]);
  const [workoutDate, setWorkoutDate] = useState(new Date().toISOString().split('T')[0]); // current date in YYYY-MM-DD format

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username) {
      setUserName(storedUser.username);
    }
  }, []);

  const handleExerciseChosen = (name) => {
    setExerciseName(name);
    setShowExerciseDetails(true);
  };

  const handleSaveExercise = (name, sets) => {
    const newExercise = { name, sets };
    setExercises([...exercises, newExercise]);
    setShowExerciseDetails(false);
    setExerciseName('');
  };

  const handleWorkoutSelection = (workout) => {
    setSelectedWorkout(workout);
    setShowExerciseList(true);
    setShowExerciseDetails(false);
  };

  const handleFinishTraining = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Get the logged-in user from local storage
    const userId = storedUser._id; // Get the user ID

    const workoutData = {
      date: workoutDate,
      workoutType: selectedWorkout,
      exercises,
    };

    try {
      const response = await axios.post('http://localhost:3000/workout', {
        userId, // Send the userId in the request body
        workout: workoutData, // Send the workout data under "workout"
      });
      console.log('Response:', response.data);
      // Navigate to HomePage after saving
      navigate('/homepage');
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };
  const goHome = () => {
    navigate ('/homepage')
  }

  return (
    <div id="container">
      <header>
        <h1>Gym Log</h1>
      </header>
      <main>
        {!selectedWorkout && !showExerciseList && (
          <WelcomeUser>Hello {userName}, What are you training today?</WelcomeUser>
        )}
        {selectedWorkout && (
          <h2>{selectedWorkout.charAt(0).toUpperCase() + selectedWorkout.slice(1).replace('-', ' & ')}</h2>
        )}
        
        {showExerciseList && !showExerciseDetails && (
          <ExerciseList selectedWorkout={selectedWorkout} onExerciseChosen={handleExerciseChosen} />
        )}

        {showExerciseDetails && (
          <div>
            <h3>{exerciseName}</h3>
            <ExerciseDetails exerciseName={exerciseName} onSave={handleSaveExercise} />
          </div>
        )}

        {!showExerciseList && !showExerciseDetails && (
          <div>
            <button onClick={() => handleWorkoutSelection('chest')}>Chest</button>
            <button onClick={() => handleWorkoutSelection('back')}>Back</button>
            <button onClick={() => handleWorkoutSelection('arms')}>Arms</button>
            <button onClick={() => handleWorkoutSelection('shoulders')}>Shoulders</button>
            <button onClick={() => handleWorkoutSelection('legs')}>Legs</button>
            <button onClick={() => handleWorkoutSelection('push')}>Push</button>
            <button onClick={() => handleWorkoutSelection('pull')}>Pull</button>
            <button onClick={() => handleWorkoutSelection('chest-back')}>Chest & Back</button>
            <button onClick={() => handleWorkoutSelection('arms-shoulders')}>Arms & Shoulders</button>
            <button onClick={() => handleWorkoutSelection('upperbody')}>Upperbody</button>
            <button onClick={() => handleWorkoutSelection('full-body')}>Full Body</button>
          </div>
        )}

        <button id="finish-training-btn" onClick={handleFinishTraining}>Finish Training</button>
        <button id="gohome" onClick={goHome}>Home</button>
      </main>
      <footer>
        <p>&copy; 2024 Gym Log</p>
      </footer>
    </div>
  );
};

export default GymLog;
