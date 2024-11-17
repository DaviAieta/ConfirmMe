import express from "express"
import { GuestsController } from "../controller/guests.controller"

const router = express.Router()

router.get("/:uuid", GuestsController.list)
router.post("/create", GuestsController.create)
router.post("/send-code", GuestsController.sendCode)

export default router