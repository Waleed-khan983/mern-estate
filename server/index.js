import express from "express";
import Connect from "./config/db.js";
import dotenv from 'dotenv'
import authrouter from './routes/auth.route.js'
dotenv.config()

const app = express();
const port = process.env.PORT || 3000

Connect();

app.use(express.json());
app.use('/auth', authrouter)

app.listen(port, () => {
  console.log( `server is running at port ${port}`);
});
