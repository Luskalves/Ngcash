import z from 'zod';

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

export default userSchema;