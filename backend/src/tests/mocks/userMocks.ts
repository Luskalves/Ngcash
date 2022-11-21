import 'dotenv/config';
import md5 from "md5";
import * as jwt from 'jsonwebtoken';
import IUser from "../../interfaces/IUser";
import IUserInfo from "../../interfaces/IUserInfo";

const { JWT_SECRET } = process.env;

const validUser: IUser = {
  username: "validUser",
  password: "validpass"
}

const payload = {
  username: validUser.username,
}

const tokenMock = jwt.sign(payload, String(JWT_SECRET), { expiresIn: '24h' });
const hashPassword = md5(validUser.password);

const tokenResponse = {
  token: tokenMock,
}

const validUserDB = {
  username: "validUser",
  password: hashPassword
}

const accountMock = {
  id: 1,
  balance: 100
}

const userInfoMock: IUserInfo = {
  id: 1,
  username: "mockUser",
  accountId: accountMock.id,
  balance: 100
}

const userInfoMock2: IUserInfo = {
  id: 2,
  username: "mockUser2",
  accountId: 2,
  balance: 50
}

const registeredUserUMock = {
  id: 1,
  username: "mockUser",
  password: "mockPass",
  accountId: accountMock.id
}

const newRegisteredUserUMock = {
  id: 1,
  username: "mockNewUser",
  password: "mockPassWord",
  accountId: accountMock.id
}

const parsedMock = {
  success: true,
  data: validUser,
}

export {
  validUser,
  tokenMock,
  parsedMock,
  accountMock,
  validUserDB,
  userInfoMock,
  userInfoMock2,
  tokenResponse,
  registeredUserUMock,
  newRegisteredUserUMock };