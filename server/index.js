import express from "express";
import Connect from "./config/db.js";
import dotenv from 'dotenv'
dotenv.config()

const app = express();
const port = process.env.PORT || 3000

Connect();

app.listen(port, () => {
  console.log( `server is running at port ${port}`);
});
