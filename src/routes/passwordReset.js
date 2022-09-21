import { Router } from "express"
const router = Router()
import passwordReset  from '../controllers/passwordReset.js'

router.post('/', passwordReset.passwordReset)
router.post('/:userId/:token', passwordReset.resetPass)

export default router