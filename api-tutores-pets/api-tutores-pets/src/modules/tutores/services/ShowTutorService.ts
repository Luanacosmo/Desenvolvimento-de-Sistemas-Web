import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Tutor from "../typeorm/entities/Tutor";

interface IRequest {
  id: string;
}

export default class ShowTutorService {
  public async execute({ id }: IRequest): Promise<Tutor> {
    const tutorRepository = AppDataSource.getRepository(Tutor);

    const tutor = await tutorRepository.findOne({
      where: { id },
      relations: ["pets"],
    });

    if (!tutor) {
      throw new AppError("Tutor não encontrado.", 404);
    }

    return tutor;
  }
}
