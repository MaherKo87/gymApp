// Import required modules
const mongoose = require('mongoose');

// Define the workout schema
const workoutSchema = new mongoose.Schema({
  date: String,
  workoutType: String,
  exercises: [
    {
      name: String,
      sets: [
        {
          setNumber: Number,
          kgs: Number,
          reps: Number,
        },
      ],
    },
  ],
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  password: { type: String, required: true },
  age: { type: Number },
  sex: { type: String },
  height: { type: Number },
  weight: { type: Number },
  workouts: [workoutSchema], // Add workouts as an array of workoutSchema
}, {
  collection: 'Users', // Specify the existing collection name here
});

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
