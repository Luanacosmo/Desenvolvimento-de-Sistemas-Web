import { compare, hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import Usuario from "../typeorm/entities/Usuario";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";

interface IRequest {
  usuario_id: string;
  nome: string;
  email: string;
  senha_atual?: string;
  senha_nova?: string;
}

export default class UpdateProfileService {
  public async execute({
    usuario_id,
    nome,
    email,
    senha_atual,
    senha_nova,
  }: IRequest): Promise<Usuario> {
    const usuarioRepository = new UsuarioRepository();
    const usuario = await usuarioRepository.findById(usuario_id);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const usuarioComEmail = await usuarioRepository.findByEmail(email);

    if (usuarioComEmail && usuarioComEmail.id !== usuario_id) {
      throw new AppError("Este email já está em uso.");
    }

    usuario.nome = nome;
    usuario.email = email;

    if (senha_nova && !senha_atual) {
      throw new AppError("É necessário informar a senha atual para definir uma nova senha.");
    }

    if (senha_nova && senha_atual) {
      const senhaAtualConfere = await compare(senha_atual, usuario.senha_hash);

      if (!senhaAtualConfere) {
        throw new AppError("A senha atual não confere.");
      }

      usuario.senha_hash = await hash(senha_nova, 8);
    }

    await usuarioRepository.save(usuario);

    return usuario;
  }
}
