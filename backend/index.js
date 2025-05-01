import express from "express";
import { config } from "dotenv";
config({path: "./env/config.env"});

const server=express();

server.get("/", (req, res)=> {
  return res.send("Welcome to News Nest server");
});

server.listen(process.env.PORT, ()=> {
  console.log(`Server listening on port ${process.env.PORT}`);
});