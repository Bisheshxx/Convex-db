import { v } from "convex/values";
import { mutation } from "./_generated/server";
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
