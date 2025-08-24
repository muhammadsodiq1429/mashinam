import { ServiceUnavailableException } from "@nestjs/common";
import { Resend } from "resend";

const resend = new Resend("re_hgS5ob5a_aFs5sqGGZ65yjoAWAn6hDHkU");

export const sendmail = async (user: {
  email: string;
  full_name: string;
  otp: string;
}) => {
  const { data, error } = await resend.emails.send({
    to: user.email,
    subject: "Welcome to Mashinam app",
    html: `<h3>Your otp: ${user.otp}</h3>`,
    from: "muhammadsodiqmuhammadjanov@gmail.com",
  });

  if (error) {
    console.error({ error });
    throw new ServiceUnavailableException(error);
  }

  console.log({ data });
};
