import { AppDataSource } from "@shared/typeorm/data-source";
import Tutor from "../typeorm/entities/Tutor";

export default class ListTutorService {
  public async execute(): Promise<Tutor[]> {
    const tutorRepository = AppDataSource.getRepository(Tutor);
    const tutores = await tutorRepository.find({ relations: ["pets"] });
    return tutores;
  }
}
