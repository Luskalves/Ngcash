import cors from 'cors';
import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import userRoute from './routes/userRoute';
import transRoute from './routes/transactionsRoute';
import loginRoute from './routes/loginRoute';
import registerRoute from './routes/registerRoute';
import errorMiddleware from './middlewares/errorMiddleware';

const { SERVER_PORT } = process.env;

const server = express();

server.use(express.json())

server.use(cors());

server.use('/user', userRoute)
server.use('/login', loginRoute)
server.use('/register', registerRoute);
server.use('/transactions', transRoute);

server.use(errorMiddleware);

server.listen(SERVER_PORT, () => {
  console.log(`server on port: ${SERVER_PORT}`)
})