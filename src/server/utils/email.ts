import nodemailer from "nodemailer";
import { env } from "../../env.js";
import fs from "fs";
import path from "path";
console.log(env.USERID, env.PASS, "creds");
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: env.USERID,
    pass: env.PASS,
  },
});

// const transport = nodemailer.createTransport({
//   host: env.HOST,
//   port: 587,
//   auth: {
//     user: env.USERID,
//     pass: env.PASS,
//   },
// });

export const sendOTPEmail = async (
  email: string,
  otp: string,
  name: string,
) => {
  try {
    console.log(
      path.join(process.cwd(), "/public/templates/otpEmailTemplate.html"),
    );
    const htmlTemplate = fs.readFileSync(
      path.join(
        path.join(process.cwd(), "/public/templates/otpEmailTemplate.html"),
      ),
      "utf-8",
    );

    // Replace the placeholders with actual values
    const htmlContent = htmlTemplate
      .replace("{{user_name}}", name)
      .replace("{{otp}}", otp);

    // Define the email options
    const mailOptions = {
      from: "ravi@kumarravi.in", // sender address
      to: email, // recipient's email address
      subject: "OTP for account verification", // email subject
      text: `Your OTP is: ${otp}`, // plain text body
      html: htmlContent, // html body
    };

    // Send the email
    await transport.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

export const successfulRegisteration = async (email: string) => {
  try {
    console.log(email, "recepient");
    console.log(
      path.join(process.cwd(), "/public/templates/otpEmailTemplate.html"),
    );
    const htmlTemplate = fs.readFileSync(
      path.join(
        path.join(
          process.cwd(),
          "/public/templates/SuccessfullyRegistered.html",
        ),
      ),
      "utf-8",
    );

    // Replace the placeholders with actual values
    const htmlContent = htmlTemplate.replace("{{user_name}}", email);

    // Define the email options
    const mailOptions = {
      from: "ravi@kumarravi.in", // sender address
      to: email, // recipient's email address
      subject: "successful registration", // email subject
      // text: `Your`, // plain text body
      html: htmlContent, // html body
    };
    // Send the email
    await transport.sendMail(mailOptions);
    console.log(" email sent successfully");
  } catch (error) {
    console.error("Error sending register email:", error);
    throw error;
  }
};
