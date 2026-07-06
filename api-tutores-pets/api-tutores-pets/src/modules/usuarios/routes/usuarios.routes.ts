import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import multer from "multer";
import UsuarioController from "../controllers/UsuarioController";
import UsuarioAvatarController from "../controllers/UsuarioAvatarController";
import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import uploadConfig from "@config/upload";

const usuariosRouter = Router();
const usuarioController = new UsuarioController();
const usuarioAvatarController = new UsuarioAvatarController();
const upload = multer(uploadConfig);

usuariosRouter.get("/", isAuthenticated, async (req, res, next) => {
  try {
    await usuarioController.index(req, res, next);
  } catch (err) {
    next(err);
  }
});

usuariosRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().min(6).required(),
    },
  }),
  async (req, res, next) => {
    try {
      await usuarioController.create(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

usuariosRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      await usuarioAvatarController.update(req, res, next);
    } catch (err) {
      next(err);
    }
  },
);

export default usuariosRouter;
