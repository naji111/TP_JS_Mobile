import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/booktracker')
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    pages: Number,
    pagesRead: Number,
    price: Number,
    status: String,
    format: String,
    suggestedBy: String,
    finished: Boolean,
});

const BookModel = mongoose.model('Book', bookSchema);

app.post('/books', async (req, res) => {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).send(book);
});

app.get('/books', async (req, res) => {
    const books = await BookModel.find();
    res.send(books);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});