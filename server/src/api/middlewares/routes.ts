import { Request, Response } from 'express'
import { API_ERRORS } from '@constants'
import { notFound } from '@utils/errors'

export const fallbackRoute = (req: Request, res: Response): Response => {
  return res.status(404).json(notFound(API_ERRORS.NOT_FOUND))
}
