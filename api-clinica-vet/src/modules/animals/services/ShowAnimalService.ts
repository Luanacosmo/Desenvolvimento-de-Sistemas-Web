import { AppDataSource } from "@shared/typeorm/data-source";
import Animal from "../typeorm/entities/Animal";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
}

export default class ShowAnimalService{
    public async execute({id}: IRequest): Promise<Animal>{
        const AnimalRepository = AppDataSource.getRepository(Animal);

        const animal = await AnimalRepository.findOneBy({id});
        if(!animal){
            throw new AppError("Animal not found.");
        }

        return animal;
    }
}