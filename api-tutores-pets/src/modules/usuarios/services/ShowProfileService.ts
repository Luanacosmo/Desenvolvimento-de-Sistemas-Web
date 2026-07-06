import AppError from "@shared/errors/AppError";
import Usuario from "../typeorm/entities/Usuario";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";

interface IRequest {
  usuario_id: string;
}

export default class ShowProfileService {
  public async execute({ usuario_id }: IRequest): Promise<Usuario> {
    const usuarioRepository = new UsuarioRepository();
    const usuario = await usuarioRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return usuario;
  }
}
