import Bluebird from "bluebird";
import { Request, Response } from "express";
import { IgLoginRequiredError } from "instagram-private-api";
import { HttpCode } from "../enums/httpCode.enum";
import { JwtTokenPayload } from "../models/jwt-token.model";
import { ApiService } from "../services/api.service";
import { authenticateToken } from "../services/jtw.service";

export const ProfileController = async (req: Request, res: Response) => {
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

  Bluebird.try(async () => {
    await client.state.deserialize(decodedToken.state);

    // Check if a specific username is passed in the body otherwise use the user id.
    const userId = req.body.username
      ? await client.user.getIdByUsername(req.body.username)
      : client.state.cookieUserId;

    const userProfile: object = await client.user.info(userId);

    res.status(HttpCode.OK).send(userProfile);
  })
    .catch(IgLoginRequiredError, (err) =>
      res.status(HttpCode.UNAUTHORIZED).send(JSON.stringify(err))
    )
    .catch((err) => {
      res.status(HttpCode.BAD_REQUEST).send(JSON.stringify(err));
    });
};
