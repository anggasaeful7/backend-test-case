import Books from "../models/BookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Books.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
