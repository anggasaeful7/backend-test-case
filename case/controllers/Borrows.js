import Books from "../models/BookModel.js";
import Borrows from "../models/BorrowModel.js";
import Members from "../models/MemberModel.js";

export const borrowBook = async (req, res) => {
  const { id_user, id_book } = req.body;
  const date = new Date();
  const expire = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000); // Tambah 7 hari

  try {
    // Cek status member
    const member = await Members.findByPk(id_user);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.status === "Penalized") {
      return res
        .status(403)
        .json({ message: "Member is currently being penalized" });
    }

    // Cek jumlah buku yang sedang dipinjam oleh user
    const count = await Borrows.count({
      where: {
        id_user: id_user,
        // Tambahkan kondisi lainnya jika perlu, seperti memastikan buku belum dikembalikan
      },
    });

    if (count >= 2) {
      return res
        .status(400)
        .json({ message: "Members may not borrow more than 2 books" });
    }

    // Mencari buku berdasarkan id_book untuk cek stok
    const book = await Books.findByPk(id_book);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.stock > 0) {
      // Jika stok tersedia, lanjutkan proses peminjaman
      await Borrows.create({
        id_user,
        id_book,
        date: date.toISOString(),
        expire: expire.toISOString(),
      });

      // Mengurangi stok buku
      book.stock -= 1;
      await book.save();
      res.json({ message: "Borrowed successfully and stock updated" });
    } else {
      // Jika stok tidak tersedia, kirim pesan stok habis
      res
        .status(400)
        .json({ message: "This book has been borrowed by another member" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const returnBook = async (req, res) => {
  const { id } = req.body;

  try {
    // Retrieve the borrow record by ID
    const borrow = await Borrows.findByPk(id);
    if (!borrow) {
      return res.status(404).json({ message: "Borrow record not found" });
    }

    // Check if the book is returned after its due date
    const date = new Date();
    const currentDate = date.toISOString();
    console.log(borrow.expire, currentDate);
    if (borrow.expire < currentDate) {
      // Update member status if the book is returned late
      await updateMemberStatus(borrow.id_user);
      console.log("Member Terlambat");
    }

    // Update book stock
    await incrementBookStock(borrow.id_book);

    // Delete the borrow record
    await Borrows.destroy({ where: { id } });
    res.json({ message: "Returned successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

async function updateMemberStatus(memberId) {
  const member = await Members.findByPk(memberId);
  if (member && member.status !== "Penalized") {
    member.status = "Penalized";
    const penalizedDays = 3;
    member.penalized_at = new Date(
      new Date().getTime() + penalizedDays * 24 * 60 * 60 * 1000
    );
    await member.save();
  }
}

async function incrementBookStock(bookId) {
  const book = await Books.findByPk(bookId);
  if (book) {
    book.stock += 1;
    await book.save();
  }
}

export const getBorrowed = async (req, res) => {
  try {
    const borrows = await Borrows.findAll({
      include: [
        {
          model: Members,
          attributes: ["code", "name"],
        },
        {
          model: Books,
          attributes: ["code", "title", "author"],
        },
      ],
    });
    res.json(borrows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
