import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    email: v.string(),
    userType: v.string(),
    classCode: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  task: defineTable({
    creatorID: v.string(),
    title: v.string(),
    description: v.string(),
    classCode: v.string(),
    creatorEmail: v.string(),
  }),
});
