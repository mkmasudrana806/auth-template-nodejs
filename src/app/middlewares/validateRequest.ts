import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnyZodObject } from "zod";

/**
 * ---------------------- validate Client Request Data ------------------
 * @param schema any zod validation schemas
 * @returns return parsed data to the next middleware
 */
const validateRequestData = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validateRequestData;
