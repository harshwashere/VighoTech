import { Schema, model } from "mongoose";

const bookModel = new Schema({
    bookId: {
        type: String,
        required: true,
        unique: true,
    },
    bookName: {
        type: String,
        required: true,
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    renteduser: {
        type: String,
        ref: 'User',
        default: ""
    },
});

const Book = model('Books', bookModel)

export default Book