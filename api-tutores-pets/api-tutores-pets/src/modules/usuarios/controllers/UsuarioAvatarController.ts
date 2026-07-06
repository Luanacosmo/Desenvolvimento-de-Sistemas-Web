import { Request, Response, NextFunction } from "express";
import UpdateUsuarioAvatarService from "../services/UpdateUsuarioAvatarService";

export default class UsuarioAvatarController {
  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const updateAvatar = new UpdateUsuarioAvatarService();
      const usuario = await updateAvatar.execute({
        usuario_id: request.user.id,
        avatarFileName: request.file?.filename as string,
      });

      const { senha_hash, ...usuarioSemSenha } = usuario;

      return response.json(usuarioSemSenha);
    } catch (err) {
      next(err);
    }
  }
}
