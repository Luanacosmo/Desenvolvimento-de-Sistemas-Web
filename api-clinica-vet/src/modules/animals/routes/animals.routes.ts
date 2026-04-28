import { Router } from "express";
import AnimalController from "../controllers/AnimalController";
import { celebrate, Segments, Joi } from "celebrate";

const animalsRouter = Router();
const animalController = new AnimalController();

animalsRouter.get("/", async (req, res, next)=> {
    try{
        await animalController.index(req, res, next);
    } catch(err){
        next(err);
    }
});

animalsRouter.get("/:id",celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() } // Parametro obrigatório
}), async (req, res, next)=> {
    try{
        await animalController.show(req, res, next);
    } catch(err){
        next(err);
    }
});

animalsRouter.post("/", celebrate({
    [Segments.BODY]: {
        nome: Joi.string().required(),
        especie: Joi.string().required(),
        raca: Joi.string().required(),
        idade: Joi.number().integer().min(0).required(),
        peso: Joi.number().precision(2).min(0).required(),
        nome_dono: Joi.string().required()
    }
}), async (req, res, next)=> {
    try{
        await animalController.create(req, res, next);
    } catch(err){
        next(err);
    }
});

animalsRouter.put("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    [Segments.BODY]: {
        nome: Joi.string().required(),
        especie: Joi.string().required(),
        raca: Joi.string().required(),
        idade: Joi.number().integer().min(0).required(),
        peso: Joi.number().precision(2).min(0).required(),
        nome_dono: Joi.string().required()
    }
}), async (req, res, next)=> {
    try{
        await animalController.update(req, res, next);
    } catch(err){
        next(err);
    }
});

animalsRouter.delete("/:id", celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), async (req, res, next)=> {
    try{
        await animalController.delete(req, res, next);
    } catch(err){
        next(err);
    }
});

export default animalsRouter;