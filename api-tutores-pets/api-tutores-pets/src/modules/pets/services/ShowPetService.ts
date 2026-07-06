import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Pet from "../typeorm/entities/Pet";

interface IRequest {
  id: string;
}

export default class ShowPetService {
  public async execute({ id }: IRequest): Promise<Pet> {
    const petRepository = AppDataSource.getRepository(Pet);

    const pet = await petRepository.findOne({
      where: { id },
      relations: ["tutor"],
    });

    if (!pet) {
      throw new AppError("Pet não encontrado.", 404);
    }

    return pet;
  }
}
