import Bluebird from "bluebird";
import { Request, Response } from "express";
import { IgResponseError } from "instagram-private-api";
import { HttpCode } from "../enums/httpCode.enum";
import { JwtTokenPayload } from "../models/jwt-token.model";
import { ApiService } from "../services/api.service";
import { authenticateToken } from "../services/jtw.service";

export const LogoutController = async (req: Request, res: Response) => {
  const authorizationHeader: string | undefined = req.headers["authorization"];
  if (!authorizationHeader) {
    res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      message: "Authorization header is missing!",
    });
    return;
  }

  const decodedToken: JwtTokenPayload | null =
    authenticateToken(authorizationHeader);
  if (!decodedToken) {
    res.status(HttpCode.UNAUTHORIZED).json({
      message: "Token is not valid!",
    });
    return;
  }

  const client = await ApiService.getClient(decodedToken.seed);
  const state = decodedToken.state;

  Bluebird.try(async () => {
    await client.state.deserialize(state);
    await client.account.logout();

    res.status(HttpCode.OK).send();
  })
    .catch(IgResponseError, (err) => {
      res.status(HttpCode.BAD_REQUEST).send(JSON.stringify(err));
    })
    .catch((err) => {
      res.status(HttpCode.INTERNAL_SERVER_ERROR).send(JSON.stringify(err));
    });
};
