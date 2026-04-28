import { AppDataSource } from "@shared/typeorm/data-source";
import Animal from "../typeorm/entities/Animal";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
}

export default class DeleteAnimalService{
    public async execute({id}: IRequest): Promise<void>{
        const AnimalRepository = AppDataSource.getRepository(Animal);

        const animal = await AnimalRepository.findOneBy({id});
        if(!animal){
            throw new AppError("Animal not found.");
        }

        await AnimalRepository.remove(animal);
    }
}