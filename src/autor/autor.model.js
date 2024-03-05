const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: String,
    nationality: String,
});

module.exports = mongoose.model('Author', authorSchema);
