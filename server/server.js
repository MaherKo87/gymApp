// Import necessary modules

const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path'); // Import the path module
// Define User model/schema
const User = require('./user.js')



// Initialize Express app
const app = express()
// Enable CORS middleware
app.use(cors())
// Parse JSON requests
app.use(bodyParser.json())

// MongoDB URI
const mongoURI = 'mongodb+srv://Cluster37139:Mevoy2010@cluster37139.a7w1v6k.mongodb.net/gymApp?retryWrites=true&w=majority'

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully')
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err)
  })

// Route to save workout
app.post('/workout', async (req, res) => {
  try {
    const userId = req.body.userId; // Assuming userId is sent in the request body
    const workoutData = req.body.workout; // Assuming workout data is sent in the request body under "workout"

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.workouts.push(workoutData); // Add the workout to the user's workouts array

    await user.save(); // Save the updated user document

    res.status(201).json({ message: 'Workout saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save workout' });
  }
});

// Define login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.log('User not found:', email);
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.log('Incorrect password for user:', email);
        return res.status(401).json({ success: false, error: 'Incorrect password' });
      }
  
      // Successful login
      console.log('Login successful for user:', email);
      res.json({ success: true, user: { _id: user._id, username: user.username, email: user.email } });
      console.log(user)
      
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ success: false, error: 'Error during login' });
    }
  });

// Define register route
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  try { 
    // Check if user already exists
     const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    } 
    // Hash the password
   const hashedPassword = await bcrypt.hash(password, 10)
    // Create a new user
     const newUser = new User({
      username, email, password: hashedPassword
    })
    await newUser.save() 
    console.log(newUser)
    // Registration successful
   res.sendStatus(201)
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).send('Error registering user')
  }
})  
// Define route to get profile information
app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).send('Error fetching profile');
    }
  });
  
app.post('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const { age, sex, height, weight } = req.body;
  
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.age = age;
      user.sex = sex;
      user.height = height;
      user.weight = weight;
  
      await user.save();
  
      res.json(user);
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).send('Error updating profile');
    }
  });

// Define the workout history route
app.get('/workout/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ workouts: user.workouts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch workout history' });
  }
});

  

  // Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
   
// Start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
