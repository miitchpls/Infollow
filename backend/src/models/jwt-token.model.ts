export type JwtToken = string;

export interface JwtTokenPayload {
  seed: string;
  state: {
    [key: string]: any;
  };
}
