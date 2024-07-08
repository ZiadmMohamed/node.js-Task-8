import express from "express";
import bookRouter from "./src/modules/book/book.routes.js";
import authorRouter from "./src/modules/author/author.routes.js";
import connectionDb from "./db/connection.js";

const app = express();
const port = 3000;

connectionDb();

app.use(express.json());
app.use("/book", bookRouter);
app.use("/author", authorRouter);

app.get("/", (req, res) => res.send("Hello World!"));
app.use("*", (req, res) => res.send("404 page not found"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
