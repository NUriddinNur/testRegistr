import { Router } from "express"
const router = Router()

import userRouter from './userRouter.js'
import passwordReset from './passwordReset.js'

router.use('/user', userRouter)
router.use('/password-reset', passwordReset)

export default router