'use server';

import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
import { signIn } from '@/src/auth';
import { validateData, type ValidationErrors } from '@/src/lib/validation';
import { z } from 'zod';

export type LoginActionState = {
  errors?: ValidationErrors;
};

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const email = formData.get('email');
  const password = formData.get('password');

  const result = validateData<z.infer<typeof loginSchema>>(
    loginSchema,
    Object.fromEntries(formData),
  );
  if (!result.success) {
    return { errors: result.errors };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { errors: { global: ['Invalid email or password'] } };
        default:
          return { errors: { global: ['Something went wrong'] } };
      }
    }
    throw error;
  }

  redirect('/');
}
