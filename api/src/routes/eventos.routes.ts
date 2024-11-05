import express from 'express'
import { EventsController } from '../controller/events.controller'

const router = express.Router()

router.get('/', EventsController.list)
router.post('/create', EventsController.create)
router.get('/:uuid', EventsController.findOne)

export default router   