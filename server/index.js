import express from "express";
import Connect from "./config/db.js";
import dotenv from 'dotenv'
import authrouter from './routes/auth.route.js'
import cors from 'cors'
dotenv.config()

const app = express();
const port = process.env.PORT || 3000

Connect();

app.use(express.json());
app.use(cors());
app.use('/auth', authrouter)
   
// app.use((err,req, res, next)=>{
//     const statusCode = err.statusCode || 500;
//     const message = statusCode.message || "Internal server error";

//     return res.status(statusCode).json({
//       success: false,
//       statusCode: statusCode,
//       message: message
//     })
// })

app.listen(port, () => {
  console.log( `server is running at port ${port}`);
});
