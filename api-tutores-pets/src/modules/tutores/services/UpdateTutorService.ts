import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Tutor from "../typeorm/entities/Tutor";

interface IRequest {
  id: string;
  nome: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  data_nascimento: Date;
}

export default class UpdateTutorService {
  public async execute({
    id,
    nome,
    cpf,
    telefone,
    email,
    endereco,
    data_nascimento,
  }: IRequest): Promise<Tutor> {
    const tutorRepository = AppDataSource.getRepository(Tutor);

    const tutor = await tutorRepository.findOneBy({ id });

    if (!tutor) {
      throw new AppError("Tutor não encontrado.", 404);
    }

    const cpfExists = await tutorRepository.findOne({ where: { cpf } });

    if (cpfExists && cpfExists.id !== id) {
      throw new AppError("Já existe um tutor cadastrado com este CPF.");
    }

    const emailExists = await tutorRepository.findOne({ where: { email } });

    if (emailExists && emailExists.id !== id) {
      throw new AppError("Já existe um tutor cadastrado com este email.");
    }

    tutor.nome = nome;
    tutor.cpf = cpf;
    tutor.telefone = telefone;
    tutor.email = email;
    tutor.endereco = endereco;
    tutor.data_nascimento = data_nascimento;

    await tutorRepository.save(tutor);

    return tutor;
  }
}
