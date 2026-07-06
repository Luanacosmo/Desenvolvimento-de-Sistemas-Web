import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Pet from "../typeorm/entities/Pet";

interface IRequest {
  id: string;
}

export default class DeletePetService {
  public async execute({ id }: IRequest): Promise<void> {
    const petRepository = AppDataSource.getRepository(Pet);

    const pet = await petRepository.findOneBy({ id });

    if (!pet) {
      throw new AppError("Pet não encontrado.", 404);
    }

    await petRepository.remove(pet);
  }
}
