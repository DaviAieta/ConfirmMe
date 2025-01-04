import express from "express"
import { GuestsController } from "../controller/guests.controller"

const router = express.Router()

router.get("/:uuid", GuestsController.list)
router.post("/pre-register", GuestsController.preRegister)
router.post("/send-code", GuestsController.sendCode)
router.post("/verify-code", GuestsController.verifyCode)
router.post("/confirm", GuestsController.confirmGuest)

export default router