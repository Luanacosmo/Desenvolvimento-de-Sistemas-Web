import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('animals')
export default class Animal{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    nome:string;
    @Column()
    especie:string;
    @Column()
    raca:string;
    @Column('int')
    idade:number;
    @Column('decimal')
    peso:number;
    @Column()
    nome_dono:string;
    @CreateDateColumn()
    created_at:Date;
    @UpdateDateColumn()
    updated_at:Date;
}