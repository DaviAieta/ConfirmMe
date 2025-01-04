import express from "express"
import { CategoriesController } from "../controller/categories.controller"

const router = express.Router()

router.get("/", CategoriesController.List)
router.post("/create", CategoriesController.Create)
router.get("/:uuid", CategoriesController.findOne)

export default router