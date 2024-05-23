import { useState } from 'react';

const ExerciseDetails = ({ exerciseName, onSave }) => {
  // Initialize the state for sets with a default first set
  const [sets, setSets] = useState([{ setNumber: 1, kgs: 0, reps: 0 }]);

  // Function to add a new set
  const addSet = () => {
    const nextSetNumber = sets.length + 1;
    setSets([...sets, { setNumber: nextSetNumber, kgs: 0, reps: 0 }]);
  };

  // Function to save exercise details and reset sets for the next exercise
  const saveExerciseDetails = () => {
    onSave(exerciseName, sets);
    // Reset sets for the next exercise or any other logic you need
    setSets([{ setNumber: 1, kgs: 0, reps: 0 }]);
  };

  return (
    <div id="exercise-details-container">
      <h3>Exercise Details</h3>
      <div className="details-row">
        <label>Set</label>
        <label>Kgs</label>
        <label>Reps</label>
      </div>
      {sets.map((set) => (
        <div className="details-row" key={set.setNumber}>
          <input type="number" className="set" value={set.setNumber} readOnly />
          <input type="number" className="kgs" min="0" step="0.5" value={set.kgs} 
            onChange={(e) => 
              setSets((prevSets) => 
                prevSets.map((s) => 
                  (s.setNumber === set.setNumber ? { ...s, kgs: parseFloat(e.target.value) } : s)
                )
              )
            } 
          />
          <input type="number" className="reps" min="1" value={set.reps} 
            onChange={(e) => 
              setSets((prevSets) => 
                prevSets.map((s) => 
                  (s.setNumber === set.setNumber ? { ...s, reps: parseInt(e.target.value) } : s)
                )
              )
            } 
          />
        </div>
      ))}
      <button onClick={addSet}>Add Set</button>
      <button onClick={saveExerciseDetails}>Save and Finish</button>
    </div>
  );
};

export default ExerciseDetails;
