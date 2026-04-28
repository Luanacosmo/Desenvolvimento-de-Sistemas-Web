import { AppDataSource } from "@shared/typeorm/data-source";
import Animal from "../typeorm/entities/Animal";
import AppError from "@shared/errors/AppError";

interface IRequest{
    nome:string;
    especie:string;
    raca:string;
    idade:number;
    peso:number;
    nome_dono:string;
}

export default class CreateAnimalService{
    public async execute({nome, especie, raca, idade, peso, nome_dono}: IRequest):Promise<Animal>{
        const AnimalRepository = AppDataSource.getRepository(Animal);

        const animalExists = await AnimalRepository.findOne({
            where : {nome}
        });
        if(animalExists){
            throw new AppError("There is already one animal with this name");
        }

        const animal = AnimalRepository.create({nome, especie, raca, idade, peso, nome_dono});
        await AnimalRepository.save(animal);
        return animal;
        
    }
}