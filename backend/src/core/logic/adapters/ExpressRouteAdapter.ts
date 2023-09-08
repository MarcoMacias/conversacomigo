import { Request, Response } from 'express'
import { Controller } from '@core/logic/Controller'

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const requestData = {
      ...request.body,
      ...request.params,
      ...request.query,
      ...request.headers,
      user: request.user,
    }

    const httpResponse = await controller.handle(requestData)

    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      return response.status(httpResponse.statusCode).json(httpResponse)
    } else {
      return response
        .status(httpResponse.statusCode)
        .json(httpResponse.body.error)
    }
  }
}