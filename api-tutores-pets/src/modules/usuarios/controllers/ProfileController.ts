import { Request, Response, NextFunction } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileController {
  public async show(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const usuario_id = request.user.id;
      const showProfile = new ShowProfileService();
      const usuario = await showProfile.execute({ usuario_id });

      const { senha_hash, ...usuarioSemSenha } = usuario;

      return response.json(usuarioSemSenha);
    } catch (err) {
      next(err);
    }
  }

  public async update(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const usuario_id = request.user.id;
      const { nome, email, senha_atual, senha_nova } = request.body;

      const updateProfile = new UpdateProfileService();
      const usuario = await updateProfile.execute({
        usuario_id,
        nome,
        email,
        senha_atual,
        senha_nova,
      });

      const { senha_hash, ...usuarioSemSenha } = usuario;

      return response.json(usuarioSemSenha);
    } catch (err) {
      next(err);
    }
  }
}
