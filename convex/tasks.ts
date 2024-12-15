import { GenericId, v } from "convex/values";
import { mutation, query } from "./_generated/server";
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

export const getTasksByClassCode = query({
  args: {
    classCode: v.string(),
  },
  //   .filter((q) => q.eq(q.field("taskListId"), args.taskListId))
  handler: async (ctx, args) => {
    return await ctx.db
      .query("task")
      .filter(q => q.eq(q.field("classCode"), args.classCode))
      .collect();
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("task"),
    title: v.string(),
    description: v.string(),
  },
  handler: async (ctx, args) => {
    const { title, description } = args;
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
    });
    const res = await ctx.db.patch(args.id, { title, description });
    console.log(res);
  },
});
// export const editTask = mutation({
//   args: {
//     taskId: v.id("tasks"), // ID of the task to edit
//     updates: v.object({
//       // Object containing the fields to update
//       title: v.optional(v.string()), // Optional title update
//       description: v.optional(v.string()), // Optional description update
//       status: v.optional(v.string()), // Optional status update
//     }),
//   },
//   handler: async (ctx, args) => {
//     const { taskId, updates } = args;

//     // Fetch the existing task
//     const task = await ctx.db.get(taskId);
//     if (!task) {
//       throw new Error("Task not found");
//     }

//     // Apply the updates to the task
//     await ctx.db.patch(taskId, updates);

//     return { success: true, message: "Task updated successfully." };
//   },
// });
