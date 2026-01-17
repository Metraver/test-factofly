'use client';

import { Group, Title, Button } from '@mantine/core';
import { signOut } from 'next-auth/react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <Group
      justify="space-between"
      h="100%"
      px="md"
      py="xs"
      style={{ borderBottom: '1px solid var(--mantine-color-dark-4)' }}
    >
      <Title order={3}>{title}</Title>
      <Button onClick={() => signOut()}>Log out</Button>
    </Group>
  );
}
