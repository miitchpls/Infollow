import { Response } from "express";
import { ErrorEnum } from "../enums/error.enum";

export const loginBadPasswordErrorHandler = async (res: Response) => {
  res.status(400).send({ id: ErrorEnum.badPassword });
};
