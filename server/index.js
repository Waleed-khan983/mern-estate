import express from "express";
import Connect from "./config/db.js";
import dotenv from 'dotenv'
import authrouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import listingRouter from './routes/listing.route.js';
import cors from 'cors'
dotenv.config()

const app = express();
const port = process.env.PORT || 3000

Connect();

app.use(express.json());
app.use(cors());
app.use('/auth', authrouter)
app.use('/user', userRouter)
app.use('/user/listing', listingRouter)
   
 

app.listen(port, () => {
  console.log( `server is running at port ${port}`);
});
