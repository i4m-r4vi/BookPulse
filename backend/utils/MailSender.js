import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const sendDue = async (to, name, bookTitle, dueDate) => {
  const mailOptions = {
    from: `"Library" <${process.env.EMAIL}>`,
    to,
    subject: "Book Due Reminder - Library",
    html: `
      <p>Dear ${name},</p>
      <p>This is a friendly reminder that your borrowed book "<strong>${bookTitle}</strong>" is due tomorrow (${dueDate.toDateString()}).</p>
      <p>Please return or renew it on time to avoid any penalties.</p>
      <br/>
      <p>Regards,<br/>Library Management</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
