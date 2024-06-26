import { z } from "zod";
import { sendOTPEmail, successfulRegisteration } from "../../utils/email";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateOTP } from "~/server/utils/otp";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../../utils/password";
import jwt from "jsonwebtoken";
import { env } from "../../../env.js";
import bcrypt from "bcrypt";

import moment from "moment";
const prisma = new PrismaClient();
export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(4),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;
      console.log(name, email, password);

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.findUnique({ where: { email } });
      if (user && user.isVerified) {
        return { message: "User already Exists", userExists: 1 };
      }
      console.log(user, "user");
      // Create a new user if not found or if not verified
      const newUser = await prisma.user.upsert({
        where: { email },
        update: {},
        create: {
          name,
          email,
          hashedPassword: hashedPassword,
        },
      });
      console.log(newUser);
      // Generate OTP
      const { otp, expirationTime } = generateOTP();
      console.log(otp, expirationTime);

      const existingOTP = await prisma.otp.findFirst({ where: { email } });
      if (existingOTP) {
        await prisma.otp.update({
          where: { id: existingOTP.id },
          data: {
            otp,
            expiresAt: expirationTime.toDate(),
          },
        });
      } else {
        await prisma.otp.create({
          data: {
            email: email,
            otp,
            expiresAt: expirationTime.toDate(),
          },
        });
      }

      await sendOTPEmail(email, otp, name);

      return { message: "OTP sent to your email" };
    }),

  verifyOTP: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        otp: z.string().length(8),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, otp, name } = input;

      // Find the OTP record for the given email
      const storedOTP = await prisma.otp.findFirst({
        where: {
          email,
        },
      });
      console.log(otp);
      console.log(storedOTP);
      if (!storedOTP) {
        return { message: "Invalid OTP" };
      }

      if (storedOTP.otp !== otp) {
        return { message: "Incorrect OTP" };
      }

      const currentTime = moment();
      const otpExpiresAt = moment(storedOTP.expiresAt);

      if (currentTime.isAfter(otpExpiresAt)) {
        return { message: "OTP has expired" };
      }

      // Update the isVerified field for the OTP and the associated User
      await prisma.$transaction([
        prisma.otp.update({
          where: {
            id: storedOTP.id,
          },
          data: {
            isVerified: true,
          },
        }),
        prisma.user.update({
          where: {
            email,
          },
          data: {
            isVerified: true,
          },
        }),
      ]);
      const token: string = jwt.sign(
        { email: storedOTP.email },
        env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );
      console.log(token);
      await successfulRegisteration(storedOTP.email);
      return {
        message: "OTP verified successfully",
        token,
        user: { ...storedOTP, name },
      };
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return { message: "User not found" };
      }

      if (!user.isVerified) {
        return { message: "User does not Exists" };
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        user.hashedPassword,
      );
      if (!isPasswordValid) {
        return { message: "Incorrect password" };
      }

      const token: string = jwt.sign(
        { email: user.email },
        // @ts-ignore
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isVerified: user.isVerified,
      };

      return { message: "Login successful", token, user: userWithoutPassword };
    }),
});
