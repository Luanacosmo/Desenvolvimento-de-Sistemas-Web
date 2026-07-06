import { Request, Response, NextFunction } from "express";
import { ListUsuarioService } from "../services/ListUsuarioService";
import { CreateUsuarioService } from "../services/CreateUsuarioService";

export default class UsuarioController {
  public async index(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const service = new ListUsuarioService();
      const usuarios = await service.execute();

      const usuariosSemSenha = usuarios.map(({ senha_hash, ...rest }) => rest);

      return response.status(200).json(usuariosSemSenha);
    } catch (err) {
      next(err);
    }
  }

  public async create(
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { nome, email, senha } = request.body;

      const service = new CreateUsuarioService();
      const usuario = await service.execute({ nome, email, senha });

      const { senha_hash, ...usuarioSemSenha } = usuario;

      return response.status(201).json(usuarioSemSenha);
    } catch (err) {
      next(err);
    }
  }
}
