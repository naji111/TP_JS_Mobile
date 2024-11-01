"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/booktracker')
    .then(() => {
    console.log("MongoDB connected successfully");
})
    .catch(err => {
    console.error("MongoDB connection error:", err);
});
const bookSchema = new mongoose_1.default.Schema({
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
const BookModel = mongoose_1.default.model('Book', bookSchema);
app.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new BookModel(req.body);
    yield book.save();
    res.status(201).send(book);
}));
app.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield BookModel.find();
    res.send(books);
}));
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
