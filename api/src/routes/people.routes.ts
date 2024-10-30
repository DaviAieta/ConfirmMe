import express from 'express'
import { PeopleController } from '../controller/people.controller'

const router = express.Router()

router.get('/', PeopleController.list)
router.post('/create', PeopleController.create)

export default router   