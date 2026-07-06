import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ForgotPasswordController from "../controllers/ForgotPasswordController";
import ResetPasswordController from "../controllers/ResetPasswordController";

const senhaRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

senhaRouter.post(
  "/esqueci",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await forgotPasswordController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

senhaRouter.post(
  "/redefinir",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      senha: Joi.string().min(6).required(),
      senha_confirmacao: Joi.string()
        .required()
        .valid(Joi.ref("senha")),
    },
  }),
  async (req, res, next) => {
    try {
      await resetPasswordController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

export default senhaRouter;
