import { compare } from "bcryptjs";
import { sign, SignOptions } from "jsonwebtoken";
import authConfig from "@config/auth";
import AppError from "@shared/errors/AppError";
import Usuario from "@modules/usuarios/typeorm/entities/Usuario";
import { UsuarioRepository } from "@modules/usuarios/typeorm/repositories/UsuarioRepository";

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  usuario: Omit<Usuario, "senha_hash">;
  token: string;
}

class CreateSessionService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const usuarioRepository = new UsuarioRepository();
    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError("Combinação de email/senha incorreta.", 401);
    }

    const senhaConfere = await compare(senha, usuario.senha_hash);

    if (!senhaConfere) {
      throw new AppError("Combinação de email/senha incorreta.", 401);
    }

    const signOptions: SignOptions = {
      subject: usuario.id,
      expiresIn: authConfig.jwt.expiresIn as SignOptions["expiresIn"],
    };

    const token = sign({}, authConfig.jwt.secret, signOptions);

    const { senha_hash, ...usuarioSemSenha } = usuario;

    return {
      usuario: usuarioSemSenha,
      token,
    };
  }
}

export default CreateSessionService;
