import Usuario from "../typeorm/entities/Usuario";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";

export class ListUsuarioService {
  public async execute(): Promise<Usuario[]> {
    const usuarioRepository = new UsuarioRepository();
    return usuarioRepository.findAll();
  }
}
