import app from "./app.js";
import { connectDb } from "./src/utils/db.js";
import dotenv from "dotenv";

dotenv.config();


connectDb()
app.listen(process.env.PORT, () => {
  console.log('Server is running')
})