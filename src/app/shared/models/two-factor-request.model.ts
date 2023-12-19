export interface TwoFactorRequestModel {
  username: string;
  verificationCode: string;
  twoFactorIdentifier: string;
  verificationMethod: string;
}
