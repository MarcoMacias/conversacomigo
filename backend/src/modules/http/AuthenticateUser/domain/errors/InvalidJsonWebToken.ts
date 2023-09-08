import { DomainError } from '@core/logic/domain/DomainError'

export class InvalidJsonWebToken extends Error implements DomainError {
  constructor() {
    super(`CORE:ACCOUNTS:DOMAIN:USER:ERROS:CREATE_TOKEN`)
    this.name = 'InvalidJsonWebToken'
  }
}