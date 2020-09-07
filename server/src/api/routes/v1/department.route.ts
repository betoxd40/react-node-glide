import express, { Request, Response } from 'express'
import { departmentsJSON } from '@fixtures'
import { DepartmentSource } from '@app/types'
import { API_ERRORS } from '@constants'
import { notFound } from '@utils/errors'
import { paginate, extend } from '@utils/queries'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { limit = 0, offset = 0 } = req.query
  const expand = req.query.expand as string | string[]

  let departments = paginate(_getDepartmentJSON(), Number(limit), Number(offset))
  if (expand) departments = extend(departments, _normalizeQueryExpand(expand))

  return res.send(departments)
})

router.get('/:id', async (req: Request, res: Response) => {
  const departmentId = Number(req.params.id)
  const expand = req.query.expand as string | string[]

  let department = _getDepartmentJSON().filter((e: DepartmentSource) => e.id === departmentId)
  if (department.length === 0) return res.status(404).json(notFound(API_ERRORS.NOT_FOUND))

  if (expand) department = extend(department, _normalizeQueryExpand(expand))

  return res.send(department[0])
})

const _normalizeQueryExpand = (expand: string | string[]): string[] => {
  if (!Array.isArray(expand)) return [expand]
  return expand
}

const _getDepartmentJSON = (): Array<DepartmentSource> =>
  JSON.parse(JSON.stringify(departmentsJSON))

export default router
