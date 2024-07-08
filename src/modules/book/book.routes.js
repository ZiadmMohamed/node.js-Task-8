import { Router } from "express";
import {
  addBook,
  bookSearch,
  delBook,
  getBook,
  getBooks,
  pagination,
  updateBook,
} from "./book.controller.js";

const router = Router();

router.post("/", addBook);
router.post("/pagination", pagination);

router.get("/", getBooks);

router.post("/bookSearch", bookSearch);
router.get("/:id", getBook);

router.patch("/:id", updateBook);
router.delete("/:id", delBook);

export default router;
