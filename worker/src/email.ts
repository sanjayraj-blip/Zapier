import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export function sendEmail(from: string, to: string, body: string) {
  return resend.emails.send({
    from: from,
    to: to,
    subject: "Zap Notification",
    html: body,
  });
}
