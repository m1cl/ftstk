import {z} from "zod";
import fs from "fs";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  echo: publicProcedure
    .input(z.object({text: z.string()}))
    .query(({input}) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({name: z.string().min(1), file: z.any()}))
    .mutation(async ({ctx, input}) => {
      return ctx.db.image.create({
        data: {
          name: input.name,
          file: Buffer.from(input.file, "binary"),
        },
      });
    }),

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //  return ctx.db.post.findFirst({
  //   orderBy: { createdAt: "desc" },
  //   where: { createdBy: { id: ctx.session.user.id } },
  //  });
  // }),

  // getSecretMessage: protectedProcedure.query(() => {
  //  return "you can now see this secret message!";
  // }),
});
