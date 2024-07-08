import { Router } from "express";
import {
  addAuthor,
  authorSearch,
  delAuthor,
  getAuthor,
  getAuthorBooks,
  getAuthors,
  pagination,
  updateAuthor,
} from "./author.controller.js";
const router = Router();

router.post("/", addAuthor);

router.get("/", getAuthors);
router.get("/pagination", pagination);
router.get("/search", authorSearch);
router.get("/:id", getAuthor);
router.get("/getAuthorBooks/:id", getAuthorBooks);

router.patch("/:id", updateAuthor);
router.delete("/:id", delAuthor);

export default router;
