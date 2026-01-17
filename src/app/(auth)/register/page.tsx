'use client';

import { useActionState } from 'react';
import {
  Alert,
  Button,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { Group, Container, Paper, Anchor, Text } from '@mantine/core';
import Link from 'next/link';
import { IconAlertCircle } from '@tabler/icons-react';
import { RegisterActionState, registerAction } from './actions';

export default function RegisterPage() {
  const [state, handleSubmit, isPending] = useActionState<
    RegisterActionState,
    FormData
  >(registerAction, {});

  return (
    <Container size={500} my={40}>
      <Title ta="center">Create an account</Title>

      <Paper withBorder p={'md'} w={500} mt={30} radius="md">
        <form action={handleSubmit}>
          <Stack>
            {state.errors?.global && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
                variant="light"
              >
                {state.errors?.global.join(', ')}
              </Alert>
            )}

            <TextInput
              label="Name"
              name="name"
              placeholder="John Doe"
              disabled={isPending}
              required
              error={state.errors?.name?.join(', ')}
            />

            <TextInput
              label="Email"
              name="email"
              placeholder="you@example.com"
              required
              disabled={isPending}
              error={state.errors?.email?.join(', ')}
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Your password"
              required
              disabled={isPending}
              error={state.errors?.password?.join(', ')}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              required
              disabled={isPending}
              error={state.errors?.confirmPassword?.join(', ')}
            />

            <Button type="submit" fullWidth mt="md" loading={isPending}>
              Create account
            </Button>
          </Stack>
        </form>

        <Group justify="center" mt="md">
          <Text size="sm">
            Already have an account?{' '}
            <Anchor component={Link} href="/login" size="sm">
              Sign in
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}
