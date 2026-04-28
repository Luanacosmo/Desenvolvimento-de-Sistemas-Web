import { NextFunction, Response, Request } from "express";
import ListAnimalService from "../services/ListAnimalService";
import ShowAnimalService from "../services/ShowAnimalService";
import CreateAnimalService from "../services/CreateAnimalService";
import UpdateAnimalService from "../services/UpdateAnimalService";
import DeleteAnimalService from "../services/DeleteAnimalService";

export default class AnimalController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void>{ //Acessa List
        try{
            const listAnimal = new ListAnimalService();
            const animals = await listAnimal.execute();
            return response.status(200).json(animals);
        } catch (err){
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const showAnimal = new ShowAnimalService();
            const animal = await showAnimal.execute({id});
            return response.status(200).json(animal);
        } catch (err){
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const {nome, especie, raca, idade, peso, nome_dono} = request.body;
            const createAnimal = new CreateAnimalService();
            const animal = await createAnimal.execute({nome, especie, raca, idade, peso, nome_dono});
            return response.status(201).json(animal);
        } catch (err){
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const {nome, especie, raca, idade, peso, nome_dono} = request.body;
            const updateAnimal = new UpdateAnimalService();
            const animal = updateAnimal.execute({id, nome, especie, raca, idade, peso, nome_dono});
            return response.status(200).json(animal);
        } catch (err){
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void>{
        try{
            const id = request.params.id as string;
            const deleteAnimal = new DeleteAnimalService;
            await deleteAnimal.execute({id});
            return response.status(204).send();
        } catch (err){
            next(err);
        }
    }
}