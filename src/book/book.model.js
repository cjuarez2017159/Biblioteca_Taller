const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El nombre es obligatorio"],
    },
    author: {
        type: String,
        required: [true, "El correo es obligarorio"],
    },
    category: {
        type: String,
        required: [true, "La contraseña es obligaroria"],
    },
    isAvailable: {
        type: Boolean,
        required: true,
    },
    borrower: {
        type: String,
        default: null,
    },
});

module.exports = mongoose.model('Book', bookSchema);