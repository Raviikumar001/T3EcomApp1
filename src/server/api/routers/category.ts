import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PAGE_SIZE = 6;

export const categoryRouter = createTRPCRouter({
  getAllCategories: protectedProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
      }),
    )
    .query(async ({ input }) => {
      const { page } = input;
      console.log(page);
      const skip = (page - 1) * PAGE_SIZE;

      const categories = await prisma.category.findMany({
        skip,
        take: PAGE_SIZE,
      });

      const totalCount = await prisma.category.count();
      const totalPages = Math.ceil(totalCount / PAGE_SIZE);

      return {
        categories,
        currentPage: page,
        totalPages,
      };
    }),

  getUserCategories: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.user.id;
    console.log(userId);
    try {
      const userCategories = await prisma.userCategories.findMany({
        where: {
          userId: parseInt(ctx.user.id, 10),
        },
        select: {
          categoryId: true,
        },
      });
      return userCategories.map((uc) => parseInt(uc.categoryId));
    } catch (error) {
      console.error(error);
      return { error: "Failed to retrieve user categories" };
    }
  }),

  updateUserCategory: protectedProcedure
    .input(z.object({ categoryId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.user.id;
      console.log(userId, "userid");
      const { categoryId } = input;

      // Check if the user already has the category selected
      const existingUserCategory = await prisma.userCategories.findFirst({
        where: {
          userId: parseInt(ctx.user.id, 10),
          categoryId: categoryId.toString(), // Convert categoryId to string
        },
      });

      if (existingUserCategory) {
        // If the category is already selected, remove it
        console.log(existingUserCategory, "exitsting");
        // await prisma.userCategories.delete({
        //   where: {
        //     id: existingUserCategory.id,
        //   },
        // });

        await prisma.userCategories.deleteMany({
          where: {
            userId: parseInt(ctx.user.id, 10),
            categoryId: categoryId.toString(),
          },
        });
      } else {
        // If the category is not selected, add it
        await prisma.userCategories.create({
          data: {
            userId: parseInt(ctx.user.id, 10),
            categoryId: categoryId.toString(),
          },
        });
      }
    }),
});
