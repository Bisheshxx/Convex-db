import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { Task } from "./types";
export const createTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    classCode: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const task: Task = {
      title: args.title,
      description: args.description,
      classCode: args.classCode,
      creatorID: identity?.tokenIdentifier as string,
      creatorEmail: identity?.email as string,
    };

    if (!identity) {
      throw new Error("Called store users without authentication");
    }
    try {
      ctx.db.insert("task", task);
    } catch (error) {
      throw new Error("Some thing went wrong!");
    }
  },
});
