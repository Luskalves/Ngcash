import 'dotenv/config';
import express from 'express';

const { SERVER_PORT } = process.env;

const server = express();

server.listen(SERVER_PORT, () => {
  console.log(`server on port: ${SERVER_PORT}`)
})