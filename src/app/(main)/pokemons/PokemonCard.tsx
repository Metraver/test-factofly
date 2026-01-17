'use client';

import { Text, Card, Image, Group, Stack } from '@mantine/core';
import { Pokemon } from './query';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card
      key={pokemon.id!}
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ cursor: 'pointer' }}
    >
      <Card.Section>
        <Image
          src={pokemon.imageUrl}
          height={120}
          alt={pokemon.name}
          fit="contain"
        />
      </Card.Section>
      <Stack gap={2}>
        <Text size="sm">
          {pokemon.name}
        </Text>
        <Group gap="xs">
          <Text size="xs">
            Height: {pokemon.height}
          </Text>
          <Text size="xs">
            Weight: {pokemon.weight}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
