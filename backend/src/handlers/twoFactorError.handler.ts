import { Response } from "express";
import {
  AccountRepositoryLoginErrorResponseTwoFactorInfo,
  IgLoginTwoFactorRequiredError,
} from "instagram-private-api";
import { ErrorEnum } from "../enums/error.enum";
import { HttpCode } from "../enums/httpCode.enum";
import { VerificationMethod } from "../enums/verificationMethod.enum";

export const twoFactorErrorHandler = async (
  err: IgLoginTwoFactorRequiredError,
  res: Response
) => {
  const {
    totp_two_factor_on,
    two_factor_identifier,
    obfuscated_phone_number,
  }: AccountRepositoryLoginErrorResponseTwoFactorInfo =
    err.response.body.two_factor_info;

  const verificationMethod = VerificationMethod[totp_two_factor_on ? "0" : "1"];

  res.status(HttpCode.FORBIDDEN).json({
    id: ErrorEnum.twoFactorRequired,
    message: `Enter code received via ${verificationMethod}`,
    twoFactorIdentifier: two_factor_identifier,
    verificationMethod,
    obfuscatedPhoneNumber: obfuscated_phone_number,
  });
};
