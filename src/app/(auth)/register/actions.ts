'use server';

import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/prisma/prisma-client';
import { validateData, type ValidationErrors } from '@/src/lib/validation';

const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterActionState = {
  errors?: ValidationErrors;
};

export async function registerAction(
  _prevState: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const result = validateData<z.infer<typeof registerSchema>>(
    registerSchema,
    Object.fromEntries(formData),
  );

  if (!result.success) {
    return { errors: result.errors };
  }

  const { name, email, password } = result.data;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { errors: { global: ['Register failed'] } };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { errors: { global: ['Something went wrong'] } };
  }

  redirect('/login');
}
