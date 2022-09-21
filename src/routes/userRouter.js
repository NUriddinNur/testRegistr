import { Router } from "express"
const router = Router()
import userController  from '../controllers/userController.js'

router.get('/', userController.getAll)
router.post('/register', userController.register)
router.post('/login', userController.login)

export default router