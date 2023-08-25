
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sent:{
    type:Boolean,
    default:false
  }
});

const ReportModel = mongoose.model('report', reportSchema);

module.exports = {ReportModel};
