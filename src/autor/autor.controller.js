const Author = require('../models/author');

exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los autores' });
    }
};

exports.getAuthorById = async (req, res) => {
    const { id } = req.params;
    try {
        const author = await Author.findById(id);
        if (!author) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.status(200).json(author);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el autor' });
    }
};

exports.addAuthor = async (req, res) => {
    const { name, birthDate, nationality } = req.body;

    try {
        const newAuthor = new Author({ name, birthDate, nationality });
        await newAuthor.save();
        res.status(201).json({ message: 'Autor agregado correctamente', author: newAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar el autor' });
    }
};

exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, nationality } = req.body;

    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            id,
            { name, birthDate, nationality },
            { new: true }
        );

        if (!updatedAuthor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }

        res.status(200).json({ message: 'Autor actualizado correctamente', author: updatedAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el autor' });
    }
};

exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedAuthor = await Author.findByIdAndRemove(id);

        if (!deletedAuthor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }

        res.status(200).json({ message: 'Autor eliminado correctamente', author: deletedAuthor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el autor' });
    }
};
