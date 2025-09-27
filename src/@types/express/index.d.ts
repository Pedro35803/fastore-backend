import { TypeUser } from "../enums";

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      typeUser: TypeUser;
      file: {
        filename: string;
      };
    }
  }
}

export {};
