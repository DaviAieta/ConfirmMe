import express from "express";
import { UserController } from "../controller/users.controller";

const router = express.Router();

router.post("/create", UserController.create);

export default router;
