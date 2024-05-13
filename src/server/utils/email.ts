import nodemailer from "nodemailer";
import { env } from "../../env.js";
import fs from "fs";
import path from "path";
console.log(env.USERID, env.PASS, "creds");
// const transport = nodemailer.createTransport({
//   host: "sandbox.smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: env.USERID,
//     pass: env.PASS,
//   },
// });

const transport = nodemailer.createTransport({
  host: env.HOST,
  port: 587,
  auth: {
    user: env.USERID,
    pass: env.PASS,
  },
});

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

    const htmlContent = htmlTemplate
      .replace("{{user_name}}", name)
      .replace("{{otp}}", otp);

    //  email options
    const mailOptions = {
      from: "ravi@kumarravi.in",
      to: email,
      subject: "OTP for account verification",
      text: `Your OTP is: ${otp}`,
      html: htmlContent,
    };

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

    const htmlContent = htmlTemplate.replace("{{user_name}}", email);

    const mailOptions = {
      from: "ravi@kumarravi.in",
      to: email,
      subject: "successful registration",

      html: htmlContent,
    };

    await transport.sendMail(mailOptions);
    console.log(" email sent successfully");
  } catch (error) {
    console.error("Error sending register email:", error);
    throw error;
  }
};
