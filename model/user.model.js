const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /\S+@\S+\.\S+/.test(value); // Simple email validation using regex
      },
      message: 'Invalid email format',
    },
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = {UserModel};
