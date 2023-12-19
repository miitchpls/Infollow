import express, { Request, Response, Router } from "express";
import { HttpCode } from "../enums/httpCode.enum";
import { followersResponseMock } from "../mocks/followers.mock";
import { followingResponseMock } from "../mocks/following.mock";
import { loginResponseMock } from "../mocks/login.mock";
import { profileResponseMock } from "../mocks/profile.mock";

const MockedApiRouter: Router = express.Router();

MockedApiRouter.post("/login", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(HttpCode.OK).json(loginResponseMock);
  }, 1000);
});
MockedApiRouter.post("/logout", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(HttpCode.OK).json();
  }, 500);
});
MockedApiRouter.post("/profile", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(HttpCode.OK).json(profileResponseMock);
  }, 500);
});
MockedApiRouter.post("/encode", (req: Request, res: Response) => {
  res.status(HttpCode.OK).json(req.body.url);
});
MockedApiRouter.post("/following", (req: Request, res: Response) => {
  setTimeout(() => {
    res.status(HttpCode.OK).json(followingResponseMock);
  }, 2000);
});
MockedApiRouter.post("/followers", (req: Request, res: Response) => {
  res.status(HttpCode.OK).json(followersResponseMock);
});

export { MockedApiRouter };
