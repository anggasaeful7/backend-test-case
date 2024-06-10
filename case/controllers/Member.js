import Books from "../models/BookModel.js";
import Borrows from "../models/BorrowModel.js";
import Members from "../models/MemberModel.js";

export const getMembers = async (req, res) => {
  try {
    const members = await Members.findAll({
      include: {
        model: Borrows,
        attributes: ["id", "date", "expire"],
        include: {
          model: Books,
          attributes: ["code", "title", "author"],
        },
      },
    });
    res.json(members);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
