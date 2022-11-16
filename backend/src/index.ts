import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import registerRoute from './routes/registerRoute';
import errorMiddleware from './middlewares/errorMiddleware';

const { SERVER_PORT } = process.env;

const server = express();

server.use(express.json())

server.use('/login', )
server.use('/register', registerRoute);

server.use(errorMiddleware);

server.listen(SERVER_PORT, () => {
  console.log(`server on port: ${SERVER_PORT}`)
})