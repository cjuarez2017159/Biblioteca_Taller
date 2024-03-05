const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
};

exports.getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el libro' });
    }
};

exports.addBook = async (req, res) => {
    const { title, author, category } = req.body;

    try {
        const newBook = new Book({ title, author, category });
        await newBook.save();
        res.status(201).json({ message: 'Libro agregado correctamente', book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el libro' });
    }
};

exports.updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, category } = req.body;

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            id,
            { title, author, category },
            { new: true }
        );

        if (!updatedBook) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.status(200).json({ message: 'Libro actualizado correctamente', book: updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
};

exports.deleteBook = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedBook = await Book.findByIdAndRemove(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        res.status(200).json({ message: 'Libro eliminado correctamente', book: deletedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
};
