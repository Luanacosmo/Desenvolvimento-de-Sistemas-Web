import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import TutorController from "../controllers/TutorController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const tutoresRouter = Router();
const tutorController = new TutorController();

tutoresRouter.use(isAuthenticated);

tutoresRouter.get("/", async (req, res, next) => {
  try {
    await tutorController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

tutoresRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await tutorController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

tutoresRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cpf: Joi.string().min(11).max(14).required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      endereco: Joi.string().required(),
      data_nascimento: Joi.date().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await tutorController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

tutoresRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      cpf: Joi.string().min(11).max(14).required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      endereco: Joi.string().required(),
      data_nascimento: Joi.date().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await tutorController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

tutoresRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await tutorController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

export default tutoresRouter;
