export default {
  jwt: {
    secret: process.env.JWT_SECRET || "default-secret-troque-em-producao",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },
};
