import { Router } from 'express'

import { apiRouter } from './apis'

export const router = Router()

router.use('/api', apiRouter)
