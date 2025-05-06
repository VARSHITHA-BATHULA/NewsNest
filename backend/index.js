import express from "express";
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes.js";
config({path: "./env/config.env"});

const server=express();

server.use(express.json());

server.get("/", (req, res)=> {
  return res.send("Welcome to News Nest server");
});

server.use("/api/users", userRoutes);

const PORT=process.env.PORT;

server.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`);
});