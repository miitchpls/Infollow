import { Response } from "express";
import {
  IgLoginBadPasswordError,
  IgLoginTwoFactorRequiredError,
} from "instagram-private-api";
import { ErrorEnum } from "../enums/error.enum";
import { loginBadPasswordErrorHandler } from "./loginBadPasswordError.handler";

export const loginTwoFactorRequiredErrorHandler = async (
  err: any,
  res: Response
) => {
  const { totp_two_factor_on, two_factor_identifier } =
    err.response.body.two_factor_info;
  const verificationMethod = totp_two_factor_on ? "0" : "1"; // default to 1 for SMS

  res.status(400).send(
    JSON.stringify({
      id: ErrorEnum.twoFactorRequired,
      message: `Enter code received via ${
        verificationMethod === "1" ? "SMS" : "TOTP"
      }`,
      twoFactorIdentifier: two_factor_identifier,
      verificationMethod,
    })
  );
};

export const ErrorHandler = async (error: any, res: Response) => {
  switch (error.constructor) {
    case IgLoginBadPasswordError:
      loginBadPasswordErrorHandler(error);
      break;
    case IgLoginTwoFactorRequiredError:
      loginTwoFactorRequiredErrorHandler(error, res);
      break;
    default:
      res.status(500).send(error);
  }
};
