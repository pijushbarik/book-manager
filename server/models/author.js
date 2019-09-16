const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Book schema
const authorSchema = new Schema({
    name: String,
    age: Number
});

module.exports = mongoose.model('Author', authorSchema);