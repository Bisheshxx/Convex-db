import { z } from "zod";
export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    type: z.string().nonempty("Type is required"),
    classroomCode: z
      .string()
      .regex(
        /^[a-zA-Z0-9]{6}$/,
        "Type Code must be a 6-character alphanumerical code"
      ),
    confirmPassword: z.string().min(1, "Confirm password cannot be empty"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Error path for confirmPassword
  });

export const emailverificationSchema = z.object({
  code: z.string().min(1, "Verification code cannot be empty"),
});
