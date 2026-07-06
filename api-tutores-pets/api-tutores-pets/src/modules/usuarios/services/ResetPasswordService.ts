import { hash } from "bcryptjs";
import { isAfter, addHours } from "date-fns";
import AppError from "@shared/errors/AppError";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";
import { UsuarioTokenRepository } from "../typeorm/repositories/UsuarioTokenRepository";

interface IRequest {
  token: string;
  senha: string;
}

export default class ResetPasswordService {
  public async execute({ token, senha }: IRequest): Promise<void> {
    const usuarioRepository = new UsuarioRepository();
    const usuarioTokenRepository = new UsuarioTokenRepository();

    const usuarioToken = await usuarioTokenRepository.findByToken(token);

    if (!usuarioToken) {
      throw new AppError("Token de recuperação não existe.");
    }

    const usuario = await usuarioRepository.findById(usuarioToken.usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const tokenCreatedAt = usuarioToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token de recuperação expirado.");
    }

    usuario.senha_hash = await hash(senha, 8);
    await usuarioRepository.save(usuario);
  }
}
