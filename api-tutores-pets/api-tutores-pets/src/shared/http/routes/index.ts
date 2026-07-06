import { Router } from "express";
import tutoresRouter from "@modules/tutores/routes/tutores.routes";
import petsRouter from "@modules/pets/routes/pets.routes";
import usuariosRouter from "@modules/usuarios/routes/usuarios.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import senhaRouter from "@modules/usuarios/routes/senha.routes";
import perfilRouter from "@modules/usuarios/routes/perfil.routes";

const routes = Router();

routes.use("/tutores", tutoresRouter);
routes.use("/pets", petsRouter);
routes.use("/usuarios", usuariosRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/senha", senhaRouter);
routes.use("/perfil", perfilRouter);

routes.get("/", (request, response) => {
  return response.json({ message: "API Tutores e Pets no ar!" });
});

export default routes;
