const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors({
  origin: ['http://localhost:5173', 'https://crochet-app-fe.vercel.app'], 
  credentials: true ,
}));
app.use(express.json({limit:"50mb"}));
app.use(cookieParser())

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes")
const { errHandler } = require("./middleware/errorHandler");
app.use("/api/products", productRouter);
app.use("/api/users", userRouter)

app.use(errHandler);

app.listen(port, (err) => {
  if (err) {
    console.log("Error connecting to server", err);
  } else {
    console.log(`Server connected successfully on ${port}`);
  }
});
