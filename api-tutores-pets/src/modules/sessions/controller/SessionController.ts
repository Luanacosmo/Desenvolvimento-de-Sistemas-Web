import { Request, Response, NextFunction } from "express";
import CreateSessionService from "../services/CreateSessionService";

export default class SessionController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { email, senha } = request.body;
      const service = new CreateSessionService();
      const result = await service.execute({ email, senha });
      return response.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
