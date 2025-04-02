import { Router } from "express";
import { createBook, deleteBook, getAllBooks, getBookById, issueBook, returnBook, updateBook } from "../controllers/book-controller.js";
import upload from "../utils/upload.js";

const bookroute = Router()

bookroute.post('/issue', issueBook)
bookroute.post('/return', returnBook)
bookroute.post('/create', createBook);
bookroute.get('/find', getAllBooks);
bookroute.get('/find/:id', getBookById);
bookroute.put('/update/:id', updateBook);
bookroute.delete('/delete/:id', deleteBook);
bookroute.post('/bookcreate', upload.single('coverImage'), createBook);

export default bookroute;