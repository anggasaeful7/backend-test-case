import axios from "axios";

describe("Testing", () => {
  test("The get books", async () => {
    const res = await axios.get("http://localhost:5000/books");
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    res.data.forEach((book) => {
      expect(book).toHaveProperty("id");
      expect(book).toHaveProperty("code");
      expect(book).toHaveProperty("title");
      expect(book).toHaveProperty("author");
      expect(book).toHaveProperty("stock");
      expect(book).toHaveProperty("createdAt");
      expect(book).toHaveProperty("updatedAt");
    });
  });

  test("The get members", async () => {
    const res = await axios.get("http://localhost:5000/members");
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    res.data.forEach((member) => {
      expect(member).toHaveProperty("id");
      expect(member).toHaveProperty("code");
      expect(member).toHaveProperty("name");
      expect(member).toHaveProperty("status");
      expect(member).toHaveProperty("penalized_at");
      expect(member).toHaveProperty("createdAt");
      expect(member).toHaveProperty("updatedAt");
      expect(member).toHaveProperty("borrows");
    });
  });

  test("The get borrows", async () => {
    const res = await axios.get("http://localhost:5000/borrows");
    expect(res).toBeTruthy();
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    expect(res.data.length).toBeGreaterThan(0);
    res.data.forEach((borrow) => {
      expect(borrow).toHaveProperty("id");
      expect(borrow).toHaveProperty("id_user");
      expect(borrow).toHaveProperty("id_book");
      expect(borrow).toHaveProperty("date");
      expect(borrow).toHaveProperty("expire");
      expect(borrow).toHaveProperty("createdAt");
      expect(borrow).toHaveProperty("updatedAt");
      expect(borrow).toHaveProperty("member");
      expect(borrow).toHaveProperty("book");
    });
  });
});
