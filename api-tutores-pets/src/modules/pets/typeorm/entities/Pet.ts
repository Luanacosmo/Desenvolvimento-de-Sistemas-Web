import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import Tutor from "@modules/tutores/typeorm/entities/Tutor";

@Entity("pets")
export default class Pet {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  especie: string;

  @Column()
  raca: string;

  @Column("int")
  idade: number;

  @Column("decimal")
  peso: number;

  @Column({ type: "text", nullable: true })
  observacoes: string | null;

  @Column()
  tutor_id: string;

  @ManyToOne(() => Tutor, (tutor) => tutor.pets, { onDelete: "CASCADE" })
  @JoinColumn({ name: "tutor_id" })
  tutor: Tutor;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
