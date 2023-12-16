import express, { Router } from "express";
import { EncodeController } from "../controllers/encode.controller";
import { FollowersController } from "../controllers/followers.controller";
import { FollowingController } from "../controllers/following.controlller";
import { LoginController } from "../controllers/login.controller";
import { LogoutController } from "../controllers/logout.controller";
import { ProfileController } from "../controllers/profile.controller";
import { TwoFactorController } from "../controllers/twoFactor.controller";

const ApiRouter: Router = express.Router();

ApiRouter.post("/login", LoginController);
ApiRouter.post("/two-factor", TwoFactorController);
ApiRouter.post("/logout", LogoutController);
ApiRouter.post("/encode", EncodeController);
ApiRouter.post("/profile", ProfileController);
ApiRouter.post("/following", FollowingController);
ApiRouter.post("/followers", FollowersController);

export { ApiRouter };
