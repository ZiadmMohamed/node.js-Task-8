import bookModel from "../../../db/models/book.model.js";

export const addBook = async (req, res) => {
  try {
    const book = await bookModel.create(req.body);

    return res.status(201).json({ message: "Book added successfully", book });
  } catch (error) {
    console.error("Error adding book:", error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find();

    if (books.length) {
      return res
        .status(200)
        .json({ message: `${books.length} books found`, books });
    } else {
      return res.status(404).json({ message: "No books found" });
    }
  } catch (err) {
    console.error("Error getting book:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

export const getBook = async (req, res) => {
  try {
    const book = await bookModel.find({ _id: req.params.id });

    if (book.length) {
      res.status(200).json({ message: `${book.length} book found`, book });
    } else {
      res.status(404).json({ message: "No books found" });
    }
  } catch (err) {
    console.error("Error getting book:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error hii", error: err });
  }
};

export const updateBook = async (req, res) => {
  try {
    const book = await bookModel.updateOne({ _id: req.params.id }, req.body);

    res.status(201).json(book);
  } catch (err) {
    console.error("Error getting book:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

export const delBook = async (req, res) => {
  try {
    const book = await bookModel.deleteOne({ _id: req.params.id });

    res.status(201).json(book);
  } catch (err) {
    console.error("Error getting book:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

//__ Bonus Task __

export const pagination = async (req, res) => {
  try {
    const { skip, limit } = req.body;
    const books = await bookModel.find().skip(skip).limit(limit);

    if (books.length) {
      return res
        .status(200)
        .json({ message: `${books.length} books found`, books });
    } else {
      return res.status(404).json({ message: "No books found" });
    }
  } catch (err) {
    console.error("Error getting book:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

export const bookSearch = async (req, res) => {
  try {
    const { title, author } = req.query;
    let book;
    if (!title && !author) {
      return res.status(400).json({ message: "Search term is required" });
    }

    if (title) {
      book = await bookModel.find({ title: { $regex: title } });
    } else if (author) {
      book = await bookModel.find({ author: { $regex: author } });
    } else return res.status(400).json("invalid input");

    if (!book || book.length === 0) {
      return res.status(404).json({ message: "No books found" });
    }

    console.log("yes");
    return res.json(book);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
