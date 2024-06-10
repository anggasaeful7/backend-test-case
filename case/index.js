import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users from "./models/UserModel.js";
import Borrows from "./models/BorrowModel.js";
import Books from "./models/BookModel.js";
import Members from "./models/MemberModel.js";
import { swaggerDocs } from "./config/Swagger.js";
import swaggerUi from "swagger-ui-express";
dotenv.config();
const app = express();

app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);

Members.hasMany(Borrows, { foreignKey: "id_user" });
Borrows.belongsTo(Members, { foreignKey: "id_user" });
Books.hasMany(Borrows, { foreignKey: "id_book" });
Borrows.belongsTo(Books, { foreignKey: "id_book" });

Users.sync().then(() => console.log("User table created"));
Borrows.sync().then(() => console.log("Borrow table created"));
Books.sync().then(() => console.log("Book table created"));
Members.sync().then(() => console.log("Member table created"));

app.listen(5000, () => console.log("Server running at port 5000"));
