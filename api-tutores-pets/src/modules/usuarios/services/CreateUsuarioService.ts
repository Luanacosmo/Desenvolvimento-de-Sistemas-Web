import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import Usuario from "../typeorm/entities/Usuario";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";

interface IRequest {
  nome: string;
  email: string;
  senha: string;
}

export class CreateUsuarioService {
  public async execute({ nome, email, senha }: IRequest): Promise<Usuario> {
    const usuarioRepository = new UsuarioRepository();

    const emailExists = await usuarioRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Já existe um usuário cadastrado com este email.");
    }

    const senha_hash = await hash(senha, 8);

    const usuario = await usuarioRepository.createUsuario({
      nome,
      email,
      senha_hash,
    });

    return usuario;
  }
}
