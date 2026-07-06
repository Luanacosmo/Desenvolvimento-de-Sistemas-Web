import path from "path";
import fs from "fs";
import AppError from "@shared/errors/AppError";
import uploadConfig from "@config/upload";
import Usuario from "../typeorm/entities/Usuario";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";

interface IRequest {
  usuario_id: string;
  avatarFileName: string;
}

export default class UpdateUsuarioAvatarService {
  public async execute({ usuario_id, avatarFileName }: IRequest): Promise<Usuario> {
    const usuarioRepository = new UsuarioRepository();
    const usuario = await usuarioRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Somente usuários autenticados podem alterar o avatar.", 401);
    }

    if (usuario.avatar) {
      const avatarFilePath = path.join(uploadConfig.directory, usuario.avatar);
      const avatarFileExists = await fs.promises
        .stat(avatarFilePath)
        .then(() => true)
        .catch(() => false);

      if (avatarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    usuario.avatar = avatarFileName;
    await usuarioRepository.save(usuario);

    return usuario;
  }
}
