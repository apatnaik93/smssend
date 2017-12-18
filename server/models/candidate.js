let mongoose = require('mongoose');

let CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 10
  },
  company: {
    type: String,
    trim: true
  },
  remark: {
    type: String,
    trim: true
  }
});

let Candidate = mongoose.model('Candidate', CandidateSchema);

module.exports = {Candidate};