import 'dotenv/config';
import express from 'express';

const { SERVER_PORT } = process.env;

const server = express();

server.get('/', (req, res) => {
  res.status(200).json({
    "message": "oie"
  })
})

server.listen(SERVER_PORT, () => {
  console.log(`server on port: ${SERVER_PORT}`)
})