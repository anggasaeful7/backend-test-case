import express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { borrowBook, getBorrowed, returnBook } from "../controllers/Borrows.js";
import { getBooks } from "../controllers/Books.js";
import { getMembers } from "../controllers/Member.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", Register);
router.post("/login", Login);
router.get("/token", refreshToken);
router.delete("/logout", Logout);

router.post("/borrow", borrowBook);
router.get("/borrows", getBorrowed);
router.post("/return", returnBook);

router.get("/books", getBooks);
router.get("/members", getMembers);

export default router;
