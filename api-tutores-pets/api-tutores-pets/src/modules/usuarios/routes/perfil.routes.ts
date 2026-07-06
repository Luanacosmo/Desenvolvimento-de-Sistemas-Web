import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProfileController from "../controllers/ProfileController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const perfilRouter = Router();
const profileController = new ProfileController();

perfilRouter.use(isAuthenticated);

perfilRouter.get("/", async (req, res, next) => {
  try {
    await profileController.show(req, res, next);
  } catch (err) {
    next(err);
  }
});

perfilRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha_atual: Joi.string(),
      senha_nova: Joi.string().min(6).optional(),
      senha_nova_confirmacao: Joi.string()
        .valid(Joi.ref("senha_nova"))
        .when("senha_nova", {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  async (req, res, next) => {
    try {
      await profileController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

export default perfilRouter;
