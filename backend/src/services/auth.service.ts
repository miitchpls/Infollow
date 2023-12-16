import { Response } from "express";
import { IgApiClient } from "instagram-private-api";
import { HttpCode } from "../enums/httpCode.enum";
import { JwtToken } from "../models/jwt-token.model";
import { generateAccessToken } from "./jtw.service";

export async function performLogin(
  client: IgApiClient,
  username: string,
  res: Response
): Promise<void> {
  const serialized = await client.state.serialize();

  // Removing unnecessary information from the state.
  delete serialized.constants;
  delete serialized.supportedCapabilities;

  const token: JwtToken = generateAccessToken({
    seed: username,
    state: serialized,
  });

  res.status(HttpCode.OK).json(token);
}
