import express from "express";
import { config } from "dotenv";
config({path: "./env/config.env"});

const server=express();

server.get("/", (req, res)=> {
  return res.send("Welcome to News Nest server");
});

const PORT=process.env.PORT;

server.listen(PORT, ()=> {
  console.log(`Server listening on port ${PORT}`);
});