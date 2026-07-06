import { Request, Response, NextFunction } from "express";
import SendForgotPasswordEmailService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { email } = request.body;
      const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
      await sendForgotPasswordEmail.execute({ email });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
