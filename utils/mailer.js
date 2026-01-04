
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.GMAIL_USER);
console.log(process.env.GMAIL_PASS);

export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      // service: "gmail",
       host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        // user: process.env.GMAIL_USER,
        // pass: process.env.GMAIL_PASS,
        user: process.env.MAILTRAP_SMTP_USER,
        pass: process.env.MAILTRAP_SMTP_PASS,

      },
    });

    const info = await transporter.sendMail({
      from: `"TMS App" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log("Message sent: ", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new Error("Failed to send email");
  }
};
