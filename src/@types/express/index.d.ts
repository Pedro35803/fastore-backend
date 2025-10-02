import { RoleUser, StatusAccount } from "@prisma/client";

declare global {
  namespace Express {
    export interface Request {
      userId: string;
      userType: RoleUser;
      userStatus: StatusAccount;
      file: {
        filename: string;
      };
    }
  }
}

export {};
