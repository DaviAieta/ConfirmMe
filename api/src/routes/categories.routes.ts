import express from "express";
import { CategoriesController } from "../controller/categories.controller";

const router = express.Router();

router.get("/", CategoriesController.list);
router.post("/create", CategoriesController.create);
router.get("/:uuid", CategoriesController.findOne);
router.post("/delete", CategoriesController.delete);
router.put("/update", CategoriesController.update);

export default router;
