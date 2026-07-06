import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import PetController from "../controllers/PetController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";

const petsRouter = Router();
const petController = new PetController();

petsRouter.use(isAuthenticated);

petsRouter.get(
  "/",
  celebrate({
    [Segments.QUERY]: {
      tutor_id: Joi.string().uuid().optional(),
    },
  }),
  async (req, res, next) => {
    try {
      await petController.index(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

petsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await petController.show(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

petsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      especie: Joi.string().required(),
      raca: Joi.string().required(),
      idade: Joi.number().min(0).required(),
      peso: Joi.number().precision(2).min(0).required(),
      observacoes: Joi.string().allow("", null).optional(),
      tutor_id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await petController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

petsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
      nome: Joi.string().required(),
      especie: Joi.string().required(),
      raca: Joi.string().required(),
      idade: Joi.number().min(0).required(),
      peso: Joi.number().precision(2).min(0).required(),
      observacoes: Joi.string().allow("", null).optional(),
      tutor_id: Joi.string().uuid().required(),
    },
  }),
  async (req, res, next) => {
    try {
      await petController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

petsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
  }),
  async (req, res, next) => {
    try {
      await petController.delete(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

export default petsRouter;
