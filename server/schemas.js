import { z } from 'zod';

export const signupBodySchema = z.object({
  email: z.string().email().max(254).transform((e) => e.trim().toLowerCase()),
  password: z.string().min(8).max(128),
});

export const loginBodySchema = z.object({
  email: z.string().email().max(254).transform((e) => e.trim().toLowerCase()),
  password: z.string().min(1).max(128),
});

export const authBodySchema = signupBodySchema;

export const profileBodySchema = z.object({
  age: z.coerce.number().int().min(0).max(120).optional().nullable(),
  gender: z.string().max(40).optional().nullable(),
  state: z.string().max(80).optional().nullable(),
  district: z.string().max(80).optional().nullable(),
  category: z.string().max(40).optional().nullable(),
  income: z.union([z.coerce.number(), z.string().max(40)]).optional().nullable(),
  occupation: z.string().max(80).optional().nullable(),
  education: z.string().max(80).optional().nullable(),
  degree: z.string().max(120).optional().nullable(),
  isDisabled: z.boolean().optional().nullable(),
  isMinority: z.boolean().optional().nullable(),
  isBPL: z.boolean().optional().nullable(),
  isStudent: z.boolean().optional().nullable(),
  isFarmer: z.boolean().optional().nullable(),
  isEntrepreneur: z.boolean().optional().nullable(),
  areaType: z.string().max(40).optional().nullable(),
});

export const matchProfileSchema = profileBodySchema;

export const chatBodySchema = z.object({
  message: z.string().trim().min(1).max(2000),
});

export const statusBodySchema = z.object({
  status: z.enum(['matched', 'saved', 'applied']),
});

export function validateBody(schema) {
  return (req, res, next) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      const details = parsed.error.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
      }));
      const passwordIssue = details.find((d) => d.path === 'password');
      const error =
        passwordIssue && String(passwordIssue.message).toLowerCase().includes('at least')
          ? 'Password must be at least 8 characters'
          : details[0]?.message || 'Invalid request';
      return res.status(400).json({ error, details });
    }
    req.body = parsed.data;
    next();
  };
}
