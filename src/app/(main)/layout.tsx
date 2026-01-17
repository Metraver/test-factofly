import { Header } from '@/src/components/Header';
import { Stack } from '@mantine/core';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack h="100%">
      <Header title="Pokemons" />

      {children}
    </Stack>
  );
}
