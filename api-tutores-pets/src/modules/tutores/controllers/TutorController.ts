import { NextFunction, Request, Response } from "express";
import ListTutorService from "../services/ListTutorService";
import ShowTutorService from "../services/ShowTutorService";
import CreateTutorService from "../services/CreateTutorService";
import UpdateTutorService from "../services/UpdateTutorService";
import DeleteTutorService from "../services/DeleteTutorService";

export default class TutorController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const listTutores = new ListTutorService();
      const tutores = await listTutores.execute();
      return response.status(200).json(tutores);
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
      const showTutor = new ShowTutorService();
      const tutor = await showTutor.execute({ id });
      return response.status(200).json(tutor);
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
      const { nome, cpf, telefone, email, endereco, data_nascimento } =
        request.body;
      const createTutor = new CreateTutorService();
      const tutor = await createTutor.execute({
        nome,
        cpf,
        telefone,
        email,
        endereco,
        data_nascimento,
      });
      return response.status(201).json(tutor);
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
      const { nome, cpf, telefone, email, endereco, data_nascimento } =
        request.body;
      const updateTutor = new UpdateTutorService();
      const tutor = await updateTutor.execute({
        id,
        nome,
        cpf,
        telefone,
        email,
        endereco,
        data_nascimento,
      });
      return response.status(200).json(tutor);
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
      const deleteTutor = new DeleteTutorService();
      await deleteTutor.execute({ id });
      return response.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
