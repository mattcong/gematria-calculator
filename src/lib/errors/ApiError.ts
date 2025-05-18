export class ApiError extends Error {
  public readonly status: number
  public readonly info?: unknown

  constructor(message: string, status = 400, info?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.info = info
    Object.setPrototypeOf(this, ApiError.prototype)
  }
}
