import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Tutor from "@modules/tutores/typeorm/entities/Tutor";
import Pet from "../typeorm/entities/Pet";

interface IRequest {
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  peso: number;
  observacoes?: string | null;
  tutor_id: string;
}

export default class CreatePetService {
  public async execute({
    nome,
    especie,
    raca,
    idade,
    peso,
    observacoes,
    tutor_id,
  }: IRequest): Promise<Pet> {
    const petRepository = AppDataSource.getRepository(Pet);
    const tutorRepository = AppDataSource.getRepository(Tutor);

    const tutor = await tutorRepository.findOneBy({ id: tutor_id });

    if (!tutor) {
      throw new AppError("Tutor não encontrado.", 404);
    }

    const pet = petRepository.create({
      nome,
      especie,
      raca,
      idade,
      peso,
      observacoes,
      tutor_id,
    });

    await petRepository.save(pet);

    return pet;
  }
}
