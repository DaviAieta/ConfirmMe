import express from 'express'
import { EventsController } from '../controller/eventos.controller'

const router = express.Router()

router.get('/', EventsController.list)
router.post('/create', EventsController.create)

export default router   