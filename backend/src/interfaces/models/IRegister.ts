import INewUser from "../IUser";

export default interface IRegister {
  existUser(username: string): void;
  register(user: INewUser): void;
}