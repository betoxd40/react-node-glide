import Boom from '@hapi/boom'
import { PayloadBoomResponse } from '@app/types'

export const serverUnavailable = (message: string): PayloadBoomResponse =>
  Boom.serverUnavailable(message).output.payload

export const notFound = (message: string): PayloadBoomResponse =>
  Boom.notFound(message).output.payload
