import Book from "../models/Book.js";
import User from "../models/User.js";

export const issueBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const book = await Book.findOne({ bookId, available: true });
        if (!book) {
            return res.status(404).json({ message: "Book not available for rent" });
        }

        const user = await User.findOne({ _id: userId });
        if (user && user.rentedbook) {
            return res.status(400).json({ message: "User already has a rented book" });
        }

        book.available = false;
        await book.save();

        if (!user) {
            return res.status(404).json({ msg: "user not found" })
        } else {
            user.rentedbook = bookId;
            await user.save();
        }

        res.status(200).json({ message: "Book rented successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error renting book", error: error.message });
    }
};

export const returnBook = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findOne({ _id: userId });
        if (!user || !user.rentedbook) {
            return res.status(400).json({ message: "User has not rented any book" });
        }

        const rentedBook = await Book.findOne({ bookId: user.rentedbook });
        console.log(rentedBook)
        if (!rentedBook) {
            return res.status(404).json({ message: "Rented book not found" });
        }

        rentedBook.available = true;
        rentedBook.renteduser = ""
        await rentedBook.save();

        user.rentedbook = "";
        await user.save();

        res.status(200).json({ message: "Book returned successfully", book: rentedBook });
    } catch (error) {
        res.status(500).json({ message: "Error returning book", error: error.message });
    }
};

export const createBook = async (req, res) => {
    try {
        const { bookId, bookName, rentPerDay, available } = req.body;

        const coverImage = req.file ? req.file.path : null;

        const newBook = new Book({ bookId, bookName, rentPerDay, available, coverImage });
        await newBook.save();

        res.status(201).json({ message: "Book created successfully", book: newBook });
    } catch (error) {
        res.status(400).json({ message: "Error creating book", error: error.message });
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, available } = req.query;

        const filter = {};
        if (available !== undefined) filter.available = available === 'true';

        const skip = (page - 1) * limit;
        const books = await Book.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .exec();

        const totalBooks = await Book.countDocuments(filter);

        res.status(200).json({
            books,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById({ bookId: id });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};

export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { bookId, bookName, rentPerDay, available } = req.body;

        const updatedBook = await Book.findOne({ bookId: id }, { bookId, bookName, rentPerDay, available }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res.status(400).json({ message: "Error updating book", error: error.message });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};