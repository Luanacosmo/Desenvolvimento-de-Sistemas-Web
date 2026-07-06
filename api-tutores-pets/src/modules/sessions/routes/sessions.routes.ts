import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionController from "../controller/SessionController";

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await sessionController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

export default sessionsRouter;
