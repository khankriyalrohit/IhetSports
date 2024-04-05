import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// import path from "path"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

export const app = express()

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(fileUpload())
app.use(cors());


//Config
dotenv.config({ path:"config/config.env"});

// Routes 
import { userRouter } from "./routes/userRoute.js";

import { errorMiddleware } from "./middlewares/error.js";


app.use("/api/v1",userRouter);



// app.use(express.static(path.join(__dirname, '../frontend/build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
//   });
  


app.use(errorMiddleware)



