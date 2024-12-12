import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const store = mutation({
  args: {
    userType: v.string(),
    classCode: v.string(),
  },
  handler: async (
    ctx,
    { userType, classCode }: { userType: string; classCode: string }
  ) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called store users without authentication");
    }
    //check if user exits
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", q =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
    if (user !== null) return user._id;
    const userID = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email!,
      userType: userType as string,
      classCode: classCode as string,
    });
    return userID;
  },
});
export const getStudents = query({
  args: {
    classCode: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const student = await ctx.db
        .query("users")
        // .filter(q => q.eq(q.field("userType"), "student"))
        .filter(q =>
          q.and(
            q.eq(q.field("userType"), "student"),
            q.eq(q.field("classCode"), args.classCode) // Add your class code filter here
          )
        )
        .collect();
      return student;
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  },
});
