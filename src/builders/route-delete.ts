import { NextFunction, Request, Response } from 'express'
import { NotFound } from '../exceptions'
import { RouteBuilder } from './route-builder'

class BuildDeleteRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildDeleteRoute()
  }

  public buildDeleteRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri + '/:id', this.setHandlersForRouteMethod(this.route, this.method), (req: Request, res: Response, next: NextFunction) => {
      this.route.model.remove({ _id: req.params.id }).then(() => {
        res.status(200).send()
      }).catch((err: Error) => {
        next(new NotFound(err.message))
      })
    })
  }
}

export { BuildDeleteRoute }