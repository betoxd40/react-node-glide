import express, { Request, Response } from 'express'
import { officesJSON } from '@fixtures'
import { OfficeSource } from '@app/types'
import { API_ERRORS } from '@constants'
import { notFound } from '@utils/errors'
import { paginate, extend } from '@utils/queries'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { limit = 0, offset = 0 } = req.query
  const expand = req.query.expand as string | string[]

  let offices = paginate(_getOfficeJSON(), Number(limit), Number(offset))
  if (expand) offices = extend(offices, _normalizeQueryExpand(expand))

  return res.send(offices)
})

router.get('/:id', async (req: Request, res: Response) => {
  const officeId = Number(req.params.id)
  const expand = req.query.expand as string | string[]

  let office = _getOfficeJSON().filter((e: OfficeSource) => e.id === officeId)
  if (office.length === 0) return res.status(404).json(notFound(API_ERRORS.NOT_FOUND))

  if (expand) office = extend(office, _normalizeQueryExpand(expand))

  return res.send(office[0])
})

const _normalizeQueryExpand = (expand: string | string[]): string[] => {
  if (!Array.isArray(expand)) return [expand]
  return expand
}

const _getOfficeJSON = (): Array<OfficeSource> => JSON.parse(JSON.stringify(officesJSON))

export default router
