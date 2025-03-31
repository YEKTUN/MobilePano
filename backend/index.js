const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.urlencoded({ extended: true }));




const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const panoRouter=require("./router/panoRouter")

app.use("/pano", panoRouter)





app.listen(process.env.PORT || 5000, async () => {
    console.log("Server is running on port 5000");
  });

  mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));