import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Generated,
} from "typeorm";
import Usuario from "./Usuario";

@Entity("usuarios_tokens")
export default class UsuarioTokens {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @Generated("uuid")
  token: string;

  @Column()
  usuario_id: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuario;

  @CreateDateColumn()
  created_at: Date;
}
