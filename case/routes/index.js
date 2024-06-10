import express from "express";
import { borrowBook, getBorrowed, returnBook } from "../controllers/Borrows.js";
import { getBooks } from "../controllers/Books.js";
import { getMembers } from "../controllers/Member.js";

const router = express.Router();

/**
 * @openapi
 * /borrows:
 *   get:
 *     tags:
 *       - BORROWS
 *     description: Returns borrows
 *     responses:
 *       200:
 *         description: A list of borrows.
 */
router.get("/borrows", getBorrowed);
/**
 * @openapi
 * /borrow:
 *   post:
 *     summary: Create a new borrow entry
 *     tags:
 *       - BORROWS
 *     description: Create a new borrow entry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *                 description: The ID of the user
 *                 example: 1
 *               id_book:
 *                 type: integer
 *                 description: The ID of the book
 *                 example: 2
 *     responses:
 *       200:
 *         description: Successfully created a new borrow entry.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                   example: 1
 *                 id_book:
 *                   type: integer
 *                   example: 2
 *                 message:
 *                   type: string
 *                   example: "Borrow entry created successfully."
 */

router.post("/borrow", borrowBook);
/**
 * @openapi
 * /return:
 *   post:
 *     summary: Process the return of a borrowed book
 *     tags:
 *       - BORROWS
 *     description: Process the return of a borrowed book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the borrow record
 *                 example: 13
 *     responses:
 *       200:
 *         description: Successfully processed the book return.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 13
 *                 message:
 *                   type: string
 *                   example: "Book return processed successfully."
 */

router.post("/return", returnBook);

/**
 * @openapi
 * /books:
 *   get:
 *     tags:
 *       - BOOKS
 *     description: Returns books
 *     responses:
 *       200:
 *         description: A list of books.
 */
router.get("/books", getBooks);

/**
 * @openapi
 * /members:
 *   get:
 *     tags:
 *       - Members
 *     description: Returns members
 *     responses:
 *       200:
 *         description: A list of members.
 */
router.get("/members", getMembers);

export default router;
