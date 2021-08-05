import { CookieOptions, Request, Response } from "express";

export const __prod__ = process.env.NODE_ENV === "prod";

export const hashingSalts = 10;

export const __jwtCookieName__ = "zwt";

export const __jwtSecret__ = process.env.JWT_SECRET;

export const __cookieSecret__ = process.env.COOKIE_SECRET;

export const __cookieOptions__: CookieOptions = {
  signed: true,
  httpOnly: true,
  sameSite: "lax",
  secure: __prod__,
};

export interface TypeGraphqlContext {
  req: Request;
  res: Response;
}
