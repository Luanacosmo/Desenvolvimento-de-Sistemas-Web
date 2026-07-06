import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Tutor from "../typeorm/entities/Tutor";

interface IRequest {
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  data_nascimento: Date;
}

export default class CreateTutorService {
  public async execute({
    nome,
    cpf,
    telefone,
    email,
    endereco,
    data_nascimento,
  }: IRequest): Promise<Tutor> {
    const tutorRepository = AppDataSource.getRepository(Tutor);

    const cpfExists = await tutorRepository.findOne({ where: { cpf } });

    if (cpfExists) {
      throw new AppError("Já existe um tutor cadastrado com este CPF.");
    }

    const emailExists = await tutorRepository.findOne({ where: { email } });

    if (emailExists) {
      throw new AppError("Já existe um tutor cadastrado com este email.");
    }

    const tutor = tutorRepository.create({
      nome,
      cpf,
      telefone,
      email,
      endereco,
      data_nascimento,
    });

    await tutorRepository.save(tutor);

    return tutor;
  }
}
