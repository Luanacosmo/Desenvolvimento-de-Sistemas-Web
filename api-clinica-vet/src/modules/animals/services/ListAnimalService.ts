import { AppDataSource } from "@shared/typeorm/data-source";
import Animal from "../typeorm/entities/Animal";

export default class ListAnimalService{
    public async execute(): Promise<Animal[]>{
        const AnimalRepository = AppDataSource.getRepository(Animal);
        return await AnimalRepository.find();
    }
}