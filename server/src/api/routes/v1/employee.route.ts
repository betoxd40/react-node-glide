import express, { Request, Response } from 'express'
import { employeesJSON } from '@fixtures'
import { EmployeeSource } from '@app/types'
import { API_ERRORS } from '@constants'
import { notFound } from '@utils/errors'
import { paginate, extend } from '@utils/queries'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
  const { limit = 0, offset = 0 } = req.query
  const expand = req.query.expand as string | string[]

  let employees = paginate(_getEmployeeJSON(), Number(limit), Number(offset))
  if (expand) employees = extend(employees, _normalizeQueryExpand(expand))

  return res.send(employees)
})

router.get('/:id', async (req: Request, res: Response) => {
  const employeeId = Number(req.params.id)
  const expand = req.query.expand as string | string[]

  let employee = _getEmployeeJSON().filter((e: EmployeeSource) => e.id === employeeId)
  if (employee.length === 0) return res.status(404).json(notFound(API_ERRORS.NOT_FOUND))

  if (expand) employee = extend(employee, _normalizeQueryExpand(expand))

  return res.send(employee[0])
})

const _normalizeQueryExpand = (expand: string | string[]): string[] => {
  if (!Array.isArray(expand)) return [expand]
  return expand
}

const _getEmployeeJSON = (): Array<EmployeeSource> => JSON.parse(JSON.stringify(employeesJSON))

export default router
