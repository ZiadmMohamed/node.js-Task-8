import authorModel from "../../../db/models/author.model.js";

export const addAuthor = async (req, res) => {
  try {
    const author = await authorModel.create(req.body);
    return res.status(200).json({ msg: "author added successfuly", author });
  } catch (err) {
    return res.status(500).json({ msg: "something went wrong", err });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const authors = await authorModel.find();
    if (authors.length) {
      return res
        .status(200)
        .json({ message: `${authors.length} authors found`, authors });
    } else {
      return res.status(404).json({ message: "No authors found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "something went wrong", err });
  }
};

export const getAuthor = async (req, res) => {
  try {
    const author = await authorModel.findById(req.params.id);
    if (author) {
      res.status(200).json({ message: "Author found", author });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const delAuthor = async (req, res) => {
  try {
    const authors = await authorModel.deleteOne({ _id: req.params.id });
    return res.status(200).json(authors);
  } catch (err) {
    return res.status(500).json({ msg: "something went wrong", err });
  }
};

export const updateAuthor = async (req, res) => {
  try {
    const authors = await authorModel.updateOne(
      { _id: req.params.id },
      req.body
    );
    return res.status(200).json(authors);
  } catch (err) {
    return res.status(500).json({ msg: "something went wrong", err });
  }
};

// Bonus Task

export const pagination = async (req, res) => {
  try {
    const { skip, limit } = req.body;

    const authors = await authorModel.find().skip(skip).limit(limit);
    if (authors.length) {
      return res
        .status(200)
        .json({ message: `${authors.length} authors found`, authors });
    } else {
      return res.status(404).json({ message: "No authors found" });
    }
  } catch (err) {
    return res.status(500).json({ msg: "something went wrong", err });
  }
};

export const authorSearch = async (req, res) => {
  try {
    const { name, bio } = req.query;
    let author;
    if (!name && !bio) {
      return res
        .status(400)
        .json({ message: "Please provide a name or bio to search." });
    }

    if (name) {
      author = await authorModel.find({ name: { $regex: name } });
    } else if (bio) {
      author = await authorModel.find({ bio: { $regex: bio } });
    } else {
      return res.status(404).json({ message: "invalid input" });
    }

    if (author.length) {
      return res.json({ message: `${author.length} author found`, author });
    } else {
      return res.status(404).json({ message: "No authors found" });
    }
  } catch (err) {
    console.error("Error getting author:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error ", error: err });
  }
};

export const getAuthorBooks = async (req, res) => {
  try {
    const author = await authorModel.findById(req.params.id).populate("books");
    if (author) {
      res.status(200).json({ message: "Author found", author });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};
