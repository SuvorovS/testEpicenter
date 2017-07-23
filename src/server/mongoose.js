const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Food');

module.exports = mongoose;
