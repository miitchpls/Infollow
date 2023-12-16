import { Request, Response } from 'express';
import fetch from 'node-fetch';
import { HttpCode } from '../enums/httpCode.enum';
import { JwtTokenPayload } from '../models/jwt-token.model';
import { authenticateToken } from '../services/jtw.service';

export const EncodeController = async (req: Request, res: Response) => {
  const authorizationHeader: string | undefined = req.headers['authorization'];

  if (!authorizationHeader) {
    res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
      message: 'Authorization header is missing!',
    });
    return;
  }

  const decodedToken: JwtTokenPayload | null =
    authenticateToken(authorizationHeader);
  if (!decodedToken) {
    res.status(HttpCode.UNAUTHORIZED).json({
      message: 'Token is not valid!',
    });
    return;
  }

  // Create URL object to get the hostname.
  const host = new URL(req.body.url);

  // Fetch image data from url.
  const body = await fetch(req.body.url, {
    method: 'GET',
    headers: { Host: host.hostname },
  });

  // Convert image to blob.
  const blob: any = await body.blob().then(async (res: any) => {
    // Get actual image binary data.
    return await res.arrayBuffer();
  });

  // Convert blob data to Base64.
  const bufferBase64 = Buffer.from(blob, 'binary').toString('base64');

  // Return formatted data to use as an image.
  const encodeType = req.body.video
    ? 'data:video/mp4;base64,'
    : 'data:image/png;base64,';
  const encodedBase64 = `${encodeType}${bufferBase64}`;

  res.status(HttpCode.OK).json(encodedBase64);
};
