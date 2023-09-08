import { DomainError } from '@core/logic/domain/DomainError'

export class InvalidPassword extends Error implements DomainError {
  constructor() {
    super(`INVALID PASSWORD`)
    this.name = 'InvalidPassword'
  }
}