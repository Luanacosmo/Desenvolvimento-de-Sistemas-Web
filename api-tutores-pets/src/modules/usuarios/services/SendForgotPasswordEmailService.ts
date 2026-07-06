import path from "path";
import AppError from "@shared/errors/AppError";
import EtherealMail from "@config/mail/EtherealMail";
import { UsuarioRepository } from "../typeorm/repositories/UsuarioRepository";
import { UsuarioTokenRepository } from "../typeorm/repositories/UsuarioTokenRepository";

interface IRequest {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usuarioRepository = new UsuarioRepository();
    const usuarioTokenRepository = new UsuarioTokenRepository();

    const usuario = await usuarioRepository.findByEmail(email);

    if (!usuario) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const { token } = await usuarioTokenRepository.generate(usuario.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs",
    );

    await EtherealMail.sendMail({
      to: { name: usuario.nome, email: usuario.email },
      subject: "[api-tutores-pets] Recuperação de senha",
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: usuario.nome,
          link: `http://localhost:3000/redefinir-senha?token=${token}`,
        },
      },
    });
  }
}
