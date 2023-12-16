import Bluebird from "bluebird";
import { Request, Response } from "express";
import {
  IgApiClient,
  IgLoginBadPasswordError,
  IgLoginTwoFactorRequiredError,
  IgResponseError,
} from "instagram-private-api";
import { ErrorEnum } from "../enums/error.enum";
import { HttpCode } from "../enums/httpCode.enum";
import { twoFactorErrorHandler } from "../handlers/twoFactorError.handler";
import { ApiService } from "../services/api.service";
import { performLogin } from "../services/auth.service";

export const LoginController = async (req: Request, res: Response) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      id: ErrorEnum.unprocessableEntity,
      message: "Some parameters are missing!",
    });
    return;
  }

  const client: IgApiClient = await ApiService.getClient(username);

  Bluebird.try(async () => {
    // TODO: implement this back when fixed in lib
    // await client.simulate.preLoginFlow();
    await client.account.login(username, password);

    performLogin(client, username, res);
  })
    .catch(IgLoginBadPasswordError, () => {
      res.status(HttpCode.BAD_REQUEST).json({
        id: ErrorEnum.badPassword,
        message: "Wrong credentials!",
      });
      return;
    })
    .catch(IgLoginTwoFactorRequiredError, (err) =>
      twoFactorErrorHandler(err, res)
    )
    .catch(IgResponseError, (err) => {
      res.status(HttpCode.BAD_REQUEST).json({
        id: ErrorEnum.badRequest,
        message: JSON.stringify(err),
      });
    })
    .catch((err) => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
        id: ErrorEnum.internalServerError,
        message: JSON.stringify(err),
      });
    });
};
