import { employeesJSON, departmentsJSON, officesJSON } from '@fixtures'
import { DepartmentSource, EmployeeSource, OfficeSource } from '@app/types'

export const paginate = (
  array: Array<DepartmentSource | EmployeeSource | OfficeSource>,
  limit: number,
  offset: number
): Array<DepartmentSource | EmployeeSource | OfficeSource> => {
  if (offset > 0 && limit === 0) return array.slice(offset)
  if (offset === 0 && limit > 0) return array.filter((item, index) => index < limit && item)
  if (offset > 0 && limit > 0) return array.slice(offset).slice(0, limit)

  // Looking at the data source endpoint, this return the whole array
  // when the limit and offset are 0
  return array
}

export const extend = (
  array: Array<DepartmentSource | EmployeeSource | OfficeSource>,
  queries: string[]
): Array<any> => {
  const normalizeQueries = queries.map((q) => q.split('.'))
  const test = array.map((item) => {
    normalizeQueries.forEach((queryTree) => {
      const copyQueryTree = [...queryTree]

      for (let i = 0; i < copyQueryTree.length; i++) {
        const path = copyQueryTree.slice(0, i + 1)
        setNestedKey(item, path)
      }
    })
    return item
  })
  return test
}

export const setNestedKey = (obj: any, path: any): any => {
  if (!obj[path[0]]) return

  if (path.length === 1) {
    const key = path[path.length - 1]
    if (obj[path]) obj[path] = _getRelationFromFixuresJSON(key, obj[path])
    return
  }
  return setNestedKey(obj[path[0]], path.slice(1))
}

const _getRelationFromFixuresJSON = (
  key: string,
  id: number
): DepartmentSource | EmployeeSource | OfficeSource | null => {
  switch (key) {
    case 'department':
    case 'superdepartment': {
      const jsonFile = JSON.parse(JSON.stringify(departmentsJSON))
      const result = jsonFile.find((e: DepartmentSource) => e.id === id)
      return result
    }
    case 'office': {
      const jsonFile = JSON.parse(JSON.stringify(officesJSON))
      const result = jsonFile.find((e: OfficeSource) => e.id === id)
      return result
    }

    case 'manager': {
      const jsonFile = JSON.parse(JSON.stringify(employeesJSON))
      const result = jsonFile.find((e: EmployeeSource) => e.id === id)
      return result
    }

    default:
      return null
  }
}
