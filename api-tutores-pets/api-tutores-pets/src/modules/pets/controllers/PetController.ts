import { NextFunction, Request, Response } from "express";
import ListPetService from "../services/ListPetService";
import ShowPetService from "../services/ShowPetService";
import CreatePetService from "../services/CreatePetService";
import UpdatePetService from "../services/UpdatePetService";
import DeletePetService from "../services/DeletePetService";

export default class PetController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const tutor_id = request.query.tutor_id as string | undefined;
      const listPets = new ListPetService();
      const pets = await listPets.execute({ tutor_id });
      return response.status(200).json(pets);
    } catch (err) {
      next(err);
    }
  }

  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = request.params.id as string;
      const showPet = new ShowPetService();
      const pet = await showPet.execute({ id });
      return response.status(200).json(pet);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { nome, especie, raca, idade, peso, observacoes, tutor_id } =
        request.body;
      const createPet = new CreatePetService();
      const pet = await createPet.execute({
        nome,
        especie,
        raca,
        idade,
        peso,
        observacoes,
        tutor_id,
      });
      return response.status(201).json(pet);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = request.params.id as string;
      const { nome, especie, raca, idade, peso, observacoes, tutor_id } =
        request.body;
      const updatePet = new UpdatePetService();
      const pet = await updatePet.execute({
        id,
        nome,
        especie,
        raca,
        idade,
        peso,
        observacoes,
        tutor_id,
      });
      return response.status(200).json(pet);
    } catch (err) {
      next(err);
    }
  }

  public async delete(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const id = request.params.id as string;
      const deletePet = new DeletePetService();
      await deletePet.execute({ id });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
