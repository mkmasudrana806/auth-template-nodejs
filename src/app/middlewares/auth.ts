import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";
import asyncHanlder from "../utils/asyncHandler";

const auth = (...requiredRoles: string[]) => {
  return asyncHanlder(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      // check if token is provided to headers
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "token is not given");
      }

      // decoded the token
      let decoded;
      try {
        decoded = jwt.verify(
          token,
          config.jwt_access_secret as string
        ) as JwtPayload;
      } catch (error) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Token is unable to decoded"
        );
      }

      const { email, role } = decoded;
      // check if the user exits and not blocked and not deleted
      const user = await User.findOne({ email, role });
      if (!user) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Authorized user is not found!"
        );
      }
      if (user.status === "blocked") {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Authorized user is already blocked!"
        );
      }
      if (user.isDeleted) {
        throw new AppError(
          httpStatus.NOT_FOUND,
          "Authorized user is already deleted!"
        );
      }

      // check if the user role and token role same
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized access!");
      }

      // make sure project has index.d.ts file which include user in Request object anywhere in ./src directory
      req.user = decoded;
      next();
    }
  );
};

export default auth;
