import { UsuarioDTOCreate } from "../usuarios/dtos/Usuario";
import { Resend } from "resend";
const jwt = require("jsonwebtoken");

const resend = new Resend();

export const invite = async (email: UsuarioDTOCreate["email"]) => {
  const token = jwt.sign({ email }, process.env.AUTH_JWT_SECRET, {
    expiresIn: "1d",
  });
  const appDomain = process.env.RESEND_APP_DOMAIN;

  const { error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Hello World",
    html: `<a href='${appDomain}/auth/signup?token=${token}'
        >Clique aqui para se cadastrar</a>`,
  });

  if (error) {
    throw Error("Erro ao enviar o email de convite");
  }

  return {
    message: "Convite enviado com sucesso",
  };
};
