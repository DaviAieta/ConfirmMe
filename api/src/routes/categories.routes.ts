import express from 'express'
import { CategorieController } from '../controller/categories.controller'

const router = express.Router()

router.get('/', CategorieController.list)
router.post('/create', CategorieController.create)

export default router