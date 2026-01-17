'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Anchor,
  Stack,
  Alert,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { loginAction } from './actions';

type ActionState = {
  errors?: Record<string, string[]>;
};

export default function LoginPage() {
  const [state, handleSubmit, isPending] = useActionState<
    ActionState,
    FormData
  >(loginAction, {});

  return (
    <Container size={500} my={40}>
      <Title ta="center">Login</Title>

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

            <Button type="submit" fullWidth mt="md" loading={isPending}>
              Login
            </Button>
          </Stack>
        </form>

        <Group justify="center" mt="md">
          <Text size="sm" c="dimmed">
            Don't have an account?{' '}
            <Anchor component={Link} href="/register" size="sm">
              Register
            </Anchor>
          </Text>
        </Group>
      </Paper>
    </Container>
  );
}
