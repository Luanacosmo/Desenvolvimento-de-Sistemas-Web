import { Request, Response, NextFunction } from "express";
import ResetPasswordService from "../services/ResetPasswordService";

export default class ResetPasswordController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { token, senha } = request.body;
      const resetPassword = new ResetPasswordService();
      await resetPassword.execute({ token, senha });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
