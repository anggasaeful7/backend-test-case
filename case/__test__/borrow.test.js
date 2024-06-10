import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { borrowBook } from "../controllers/Borrows";
import Members from "../models/MemberModel.js";
import Borrows from "../models/BorrowModel.js";
import Books from "../models/BookModel.js";

jest.mock("../models/MemberModel.js", () => ({
  findByPk: jest.fn(),
}));

jest.mock("../models/BorrowModel.js", () => ({
  count: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../models/BookModel.js", () => ({
  findByPk: jest.fn(),
}));

const app = express();
app.use(bodyParser.json());
app.post("/borrow", borrowBook);

describe("POST /borrow", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if member not found", async () => {
    Members.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Member not found" });
  });

  it("should return 403 if member is penalized", async () => {
    Members.findByPk.mockResolvedValue({ status: "Penalized" });

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(403);
    expect(response.body).toEqual({
      message: "Member is currently being penalized",
    });
  });

  it("should return 400 if member has borrowed 2 books", async () => {
    Members.findByPk.mockResolvedValue({ status: "Active" });
    Borrows.count.mockResolvedValue(2);

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Members may not borrow more than 2 books",
    });
  });

  it("should return 404 if book not found", async () => {
    Members.findByPk.mockResolvedValue({ status: "Active" });
    Borrows.count.mockResolvedValue(0);
    Books.findByPk.mockResolvedValue(null);

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Book not found" });
  });

  it("should return 400 if book is out of stock", async () => {
    Members.findByPk.mockResolvedValue({ status: "Active" });
    Borrows.count.mockResolvedValue(0);
    Books.findByPk.mockResolvedValue({ stock: 0 });

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "This book has been borrowed by another member",
    });
  });

  it("should borrow book successfully if all conditions are met", async () => {
    Members.findByPk.mockResolvedValue({ status: "Active" });
    Borrows.count.mockResolvedValue(0);
    const book = { stock: 1, save: jest.fn() };
    Books.findByPk.mockResolvedValue(book);
    Borrows.create.mockResolvedValue({});

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Borrowed successfully and stock updated",
    });
    expect(book.stock).toBe(0);
    expect(book.save).toHaveBeenCalled();
  });

  it("should return 500 on internal server error", async () => {
    Members.findByPk.mockRejectedValue(new Error("Internal server error"));

    const response = await request(app)
      .post("/borrow")
      .send({ id_user: 1, id_book: 1 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Internal server error" });
  });
});
