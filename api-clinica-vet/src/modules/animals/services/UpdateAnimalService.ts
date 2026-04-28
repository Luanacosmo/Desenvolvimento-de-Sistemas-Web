import { AppDataSource } from "@shared/typeorm/data-source";
import Animal from "../typeorm/entities/Animal";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id:string;
    nome:string;
    especie:string;
    raca:string;
    idade:number;
    peso:number;
    nome_dono:string;
}

export default class UpdateAnimalService{
    public async execute({id, nome, especie, raca, idade, peso, nome_dono}: IRequest):Promise<Animal>{
        const AnimalRepository = AppDataSource.getRepository(Animal);

        const animal = await AnimalRepository.findOneBy({id});
        if(!animal){
            throw new AppError("Animal not found.");
        }

        const animalExists = await AnimalRepository.findOne({
            where : {nome}
        });
        if(animalExists && animalExists.id !== animal.id){
            throw new AppError("There is already one animal with this name");
        }

        animal.nome = nome;
        animal.especie = especie;
        animal.raca = raca;
        animal.idade = idade;
        animal.peso = peso;
        animal.nome_dono = nome_dono;
        await AnimalRepository.save(animal);
        return animal;
        
    }
}