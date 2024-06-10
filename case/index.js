import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Borrows from "./models/BorrowModel.js";
import Books from "./models/BookModel.js";
import Members from "./models/MemberModel.js";
import swaggerSpec from "./config/Swagger.js";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();
export default app;
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

(async () => {
  try {
    await db.authenticate();
    console.log("Database Connected...");
  } catch (error) {
    console.error(error);
  }
})();
app.use(cors({ credentials: true, origin: "" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

Members.hasMany(Borrows, { foreignKey: "id_user" });
Borrows.belongsTo(Members, { foreignKey: "id_user" });
Books.hasMany(Borrows, { foreignKey: "id_book" });
Borrows.belongsTo(Books, { foreignKey: "id_book" });

// Borrows.sync().then(() => console.log("Borrow table created"));
// Books.sync().then(() => console.log("Book table created"));
// Members.sync().then(() => console.log("Member table created"));

app.listen(5000, () => console.log("Server running at port 5000"));
