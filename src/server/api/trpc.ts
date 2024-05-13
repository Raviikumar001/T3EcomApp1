/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { env } from "../../env.js";

import jwt from "jsonwebtoken";
import { db } from "~/server/db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return {
    db,
    ...opts,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

//PROTECTED PROCEDURE
// const isAuthenticated = t.middleware(async ({ ctx, next }) => {
//   const authHeader = ctx?.headers?.get("Authorization");
//   if (!authHeader) {
//     throw new Error("Authorization header missing");
//   }
//   console.log(authHeader)
//   const [, token] = authHeader.split(" ");
//   if (!token) {
//     throw new Error("Authorization token missing");
//   }

//   try {
//     const decoded = jwt.verify(token, env.JWT_SECRET) as {
//       email: string;
//     };
//     return next({ ctx: { ...ctx, user: { email: decoded.email } } });
//   } catch (error) {
//     throw new Error("Invalid token");
//   }
// });

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const authHeader = ctx?.headers?.get("Authorization");
  if (!authHeader) {
    throw new Error("Authorization header missing");
  }
  console.log(authHeader);
  const [, token] = authHeader.split(" ");
  if (!token) {
    throw new Error("Authorization token missing");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      email: string;
    };

    // Get the user ID from the X-User-Id header
    const userId = ctx?.headers?.get("X-User-Id");
    if (!userId) {
      throw new Error("User ID missing in headers");
    }

    return next({
      ctx: { ...ctx, user: { email: decoded.email, id: userId } },
    });
  } catch (error) {
    throw new Error("Invalid token");
  }
});

export const protectedProcedure = t.procedure.use(isAuthenticated);
/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;
