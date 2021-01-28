const mongoose = require('mongoose');

var testSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'A Test must have a name'],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

var testModel = mongoose.model('test', testSchema);
module.exports = testModel;
