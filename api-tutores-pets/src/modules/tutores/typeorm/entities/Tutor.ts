import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Pet from "@modules/pets/typeorm/entities/Pet";

@Entity("tutores")
export default class Tutor {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  telefone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  endereco: string;

  @Column({ type: "date" })
  data_nascimento: Date;

  @OneToMany(() => Pet, (pet) => pet.tutor)
  pets: Pet[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
