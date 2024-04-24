const zod = require("zod");

const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
  userName: zod.string().email(),
});
const loginSchema = zod.object({
  password: zod.string(),
  userName: zod.string().min(3),
});

const updateSchema = zod.object({
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

module.exports = { signupSchema, loginSchema, updateSchema };
