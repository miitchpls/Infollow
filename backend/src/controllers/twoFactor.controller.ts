import Bluebird from 'bluebird';
import { Request, Response } from 'express';
import {
  AccountTwoFactorLoginOptions,
  IgResponseError,
} from 'instagram-private-api';
import { HttpCode } from '../enums/httpCode.enum';
import { VerificationMethod } from '../enums/verificationMethod.enum';
import { ApiService } from '../services/api.service';
import { performLogin } from '../services/auth.service';

export const TwoFactorController = async (req: Request, res: Response) => {
  const username = req.body.username;
  const verificationCode = req.body.verificationCode;
  const twoFactorIdentifier = req.body.twoFactorIdentifier;
  const verificationMethod = VerificationMethod[req.body.verificationMethod];
  const trustThisDevice = '1';

  if (
    !username ||
    !verificationCode ||
    !twoFactorIdentifier ||
    !verificationMethod
  ) {
    res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      message: 'Some parameters are missing!',
    });
    return;
  }

  const client = await ApiService.getClient(req.body.username);
  const payload: AccountTwoFactorLoginOptions = {
    username,
    verificationCode,
    twoFactorIdentifier,
    verificationMethod,
    trustThisDevice,
  };

  Bluebird.try(async () => {
    await client.account.twoFactorLogin(payload);
    performLogin(client, username, res);
  })
    .catch(IgResponseError, (err) => {
      res.status(HttpCode.BAD_REQUEST).send(JSON.stringify(err));
    })
    .catch((err) => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(JSON.stringify(err));
    });
};
