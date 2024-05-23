const bcrypt = require('bcryptjs');

// Replace with the hashed password from your database
const hashedPassword = '$2a$10$sYT9pXoqvxiUtNDSqZHWUe4v2Fvdkvv2O5TjFwUwww9iseYCappSy';
// Replace with the plain text password you want to check
const plainTextPassword = 'maher';

bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    if (result) {
      console.log('Password match!');
    } else {
      console.log('Password does not match.');
    }
  }
});
