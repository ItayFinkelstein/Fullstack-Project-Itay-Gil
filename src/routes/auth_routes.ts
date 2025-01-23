import express, { Request, Response } from "express";
import authController from "../controllers/auth_controller";

const authRouter = express.Router();

authRouter.post("/register", (req: Request, res: Response) => {
    authController.register(req, res);
});

authRouter.post("/login", (req: Request, res: Response) => {
    authController.login(req, res);
});

authRouter.post("/logout", (req: Request, res: Response) => {
    authController.logout(req, res);
});

authRouter.post("/refresh", (req: Request, res: Response) => {
    authController.refresh(req, res);
});

export default authRouter;