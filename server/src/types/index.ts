export interface PayloadBoomResponse {
  statusCode: number
  error: string
  message: string
}

export interface DepartmentSource {
  id: number
  name: string
  superdepartment: number | DepartmentSource | null
}

export interface OfficeSource {
  id: number
  city: string
  country: string
  address: string
}

export interface EmployeeSource {
  id: number
  first: string
  last: string
  manager: number | EmployeeSource | null
  office: number | OfficeSource | null
  department: number | DepartmentSource | null
}
