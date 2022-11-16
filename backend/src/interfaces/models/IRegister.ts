import INewUser from "../INewUser";

export default interface IRegister {
  existUser(username: string): void;
  register(user: INewUser): void;
}