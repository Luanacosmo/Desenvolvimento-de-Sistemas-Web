import { Repository } from "typeorm";
import { AppDataSource } from "@shared/typeorm/data-source";
import Usuario from "../entities/Usuario";

interface ICreateUsuarioDTO {
  nome: string;
  email: string;
  senha_hash: string;
}

export class UsuarioRepository {
  private ormRepository: Repository<Usuario>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Usuario);
  }

  public async findAll(): Promise<Usuario[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<Usuario | null> {
    return this.ormRepository.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<Usuario | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async createUsuario(data: ICreateUsuarioDTO): Promise<Usuario> {
    const usuario = this.ormRepository.create(data);
    await this.ormRepository.save(usuario);
    return usuario;
  }

  public async save(usuario: Usuario): Promise<Usuario> {
    return this.ormRepository.save(usuario);
  }
}
