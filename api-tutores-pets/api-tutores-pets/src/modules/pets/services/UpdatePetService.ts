import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Tutor from "@modules/tutores/typeorm/entities/Tutor";
import Pet from "../typeorm/entities/Pet";

interface IRequest {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  idade: number;
  peso: number;
  observacoes?: string | null;
  tutor_id: string;
}

export default class UpdatePetService {
  public async execute({
    id,
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

    const pet = await petRepository.findOneBy({ id });

    if (!pet) {
      throw new AppError("Pet não encontrado.", 404);
    }

    const tutor = await tutorRepository.findOneBy({ id: tutor_id });

    if (!tutor) {
      throw new AppError("Tutor não encontrado.", 404);
    }

    pet.nome = nome;
    pet.especie = especie;
    pet.raca = raca;
    pet.idade = idade;
    pet.peso = peso;
    pet.observacoes = observacoes ?? null;
    pet.tutor_id = tutor_id;

    await petRepository.save(pet);

    return pet;
  }
}
