# API Tutores e Pets

API REST em Node.js + TypeScript + Express + TypeORM (PostgreSQL).

## Entidades

- **Tutor** (1) → **Pet** (N): um tutor possui muitos pets; cada pet pertence a um único tutor (`tutor_id`).
- **Usuario**: cadastro (`/usuarios`) e login (`/sessions`) via JWT. As rotas de `tutores` e `pets` são protegidas e exigem o token.

## Estrutura de pastas

```
src/
  @types/express/index.d.ts      -> tipagem de request.user
  config/
    auth.ts                      -> segredo e expiração do JWT
    upload.ts                    -> config do multer (avatar)
    mail/
      EtherealMail.ts            -> envio de email via conta de teste Ethereal
      HandlebarsMailTemplate.ts  -> compila os templates .hbs
  modules/
    usuarios/                    -> cadastro, avatar, perfil, recuperação de senha
      controllers/
      routes/
        usuarios.routes.ts       -> POST/GET/PATCH avatar
        senha.routes.ts          -> esqueci/redefinir senha
        perfil.routes.ts         -> GET/PUT do próprio perfil
      services/
      typeorm/entities/          -> Usuario, UsuarioTokens
      typeorm/repositories/
      views/forgot_password.hbs
    sessions/                    -> login
    tutores/                     -> CRUD completo (controller, services, entidade)
    pets/                        -> CRUD completo (controller, services, entidade)
  shared/
    errors/AppError.ts
    http/server.ts
    http/routes/index.ts
    http/middlewares/isAuthenticated.ts
    typeorm/data-source.ts
    typeorm/migrations/
```
