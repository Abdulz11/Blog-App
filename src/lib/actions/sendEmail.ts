"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function sendEmail(
  keyword: string,
  to: string,
  subject: string | null = null,
  html: string | null = null,
) {
  try {
    const user = to.split("@")[0];
    const email = await resend.emails.send({
      from: "Blogg@gmail.com",
      to,
      subject: subject || "Your post was liked",
      html: html || `<h1>Your post was <strong>liked</strong> by ${user}!</h1>`,
    });
    console.log(email);
  } catch (e) {
    console.log(e);
    console.log("email failed to send");
  }
}
