// '1' = SMS (default), '0' = TOTP (google auth for example)
export enum VerificationMethod {
  TOTP = 0,
  SMS = 1,
}
