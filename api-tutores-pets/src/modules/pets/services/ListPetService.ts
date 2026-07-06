import { AppDataSource } from "@shared/typeorm/data-source";
import Pet from "../typeorm/entities/Pet";

interface IRequest {
  tutor_id?: string;
}

export default class ListPetService {
  public async execute({ tutor_id }: IRequest = {}): Promise<Pet[]> {
    const petRepository = AppDataSource.getRepository(Pet);

    const pets = await petRepository.find({
      where: tutor_id ? { tutor_id } : {},
      relations: ["tutor"],
    });

    return pets;
  }
}
