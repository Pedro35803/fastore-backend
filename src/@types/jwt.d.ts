import { TypeUser } from "./enums";

export {};

declare global {
  interface JwtPayload {
    iss?: string;
    sub: string;
    aud?: string | string[];
    exp: number;
    nbf?: number;
    iat?: number;
    jti?: string;
    [key: string]: any; // permite qualquer outro campo
  }
}
