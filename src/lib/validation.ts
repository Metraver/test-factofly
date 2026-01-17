import { z, ZodError } from 'zod';

export type ValidationErrors = Record<string, string[]>;

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: ValidationErrors };

function formatError(zodError: ZodError): ValidationErrors {
  const errors: ValidationErrors = {};

  zodError.issues.forEach((error) => {
    const key = error.path.join('.');

    if (!errors[key]) {
      errors[key] = [];
    }

    (errors[key] as string[]).push(error.message);
  });

  return errors;
}

export function validateData<T>(
  schema: z.ZodType<T>,
  data: unknown,
): ValidationResult<T> {
  const result = schema.safeParse(data, {});

  if (!result.success) {
    return {
      success: false,
      errors: formatError(result.error),
    };
  }

  return { success: true, data: result.data };
}
