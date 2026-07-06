import { Repository } from "typeorm";
import { AppDataSource } from "@shared/typeorm/data-source";
import UsuarioTokens from "../entities/UsuarioTokens";

export class UsuarioTokenRepository {
  private ormRepository: Repository<UsuarioTokens>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UsuarioTokens);
  }

  public async findByToken(token: string): Promise<UsuarioTokens | null> {
    return this.ormRepository.findOne({ where: { token } });
  }

  public async generate(usuario_id: string): Promise<UsuarioTokens> {
    const usuarioToken = this.ormRepository.create({ usuario_id });
    await this.ormRepository.save(usuarioToken);
    return usuarioToken;
  }
}
