import { AppDataSource } from "@shared/typeorm/data-source";
import AppError from "@shared/errors/AppError";
import Tutor from "../typeorm/entities/Tutor";

interface IRequest {
  id: string;
}

export default class DeleteTutorService {
  public async execute({ id }: IRequest): Promise<void> {
    const tutorRepository = AppDataSource.getRepository(Tutor);

    const tutor = await tutorRepository.findOneBy({ id });

    if (!tutor) {
      throw new AppError("Tutor não encontrado.", 404);
    }

    await tutorRepository.remove(tutor);
  }
}
