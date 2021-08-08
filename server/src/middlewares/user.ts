import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import {
  TypeGraphqlContext,
  __cookieSecret__,
  __jwtCookieName__,
  __jwtSecret__,
} from "../constants";

export const Authentication: MiddlewareFn<TypeGraphqlContext> = async (
  { context },
  next
) => {
  if (!__cookieSecret__) throw "cookie secret undefined";
  if (!__jwtSecret__) throw "jwt secret undefined";
  const jwtCookie = context.req.signedCookies[__jwtCookieName__];
  if (jwtCookie) {
    const unsignedCookie = cookieParser.signedCookie(
      jwtCookie,
      __cookieSecret__
    );
    if (unsignedCookie) {
      jwt.verify(unsignedCookie, __jwtSecret__, (_, data) => {
        if (data) context.req.userId = data.id;
        console.log(data);
      });
    }
  }
  await next();
};
