import jwt, { SignOptions } from "jsonwebtoken";
import { JwtToken, JwtTokenPayload } from "../models/jwt-token.model";

const jwtOptions: SignOptions = {
  mutatePayload: true,
  noTimestamp: true,
};

export function generateAccessToken({ seed, state }: JwtTokenPayload): string {
  if (!process.env.TOKEN_SECRET) throw new Error("Secret token is missing!");

  return jwt.sign({ seed, state }, process.env.TOKEN_SECRET, jwtOptions);
}

// Expected as "Bearer t0k3n"
export function authenticateToken(
  authorizationHeader: string
): JwtTokenPayload | null {
  const token: JwtToken =
    authorizationHeader && authorizationHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as JwtTokenPayload;
    return {
      seed: decoded.seed,
      state: decoded.state,
    };
  } catch (err) {
    return null;
  }
}
