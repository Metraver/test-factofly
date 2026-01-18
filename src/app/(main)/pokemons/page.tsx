import { Container, Title, Text, SimpleGrid, Stack } from '@mantine/core';
import { getPokemonsQuery, type SortField, type SortOrder } from './query';
import { PokemonFilters } from './PokemonFilters';
import PokemonCard from './PokemonCard';
import { RedirectType, redirect } from 'next/navigation';

interface SearchParams {
  page?: string;
  limit?: '10' | '20' | '50';
  sortBy?: SortField;
  sortOrder?: SortOrder;
  name?: string;
}

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function PokemonsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = params.page ? parseInt(params.page, 10) : 1;
  const limit: 10 | 20 | 50 = params.limit
    ? (parseInt(params.limit, 10) as 10 | 20 | 50)
    : 20;
  const sortBy = params.sortBy || 'name';
  const sortOrder = params.sortOrder || 'asc';

  const { pokemons, totalPages, error } = await getPokemonsQuery({
    limit: limit,
    page,
    sortBy,
    sortOrder,
  });

  if (error) {
    redirect(
      '/pokemons?page=1&limit=20&sortBy=name&sortOrder=asc',
      RedirectType.replace,
    );
  }

  return (
    <Container w="100%" py="xl">
      <Stack gap="xl">
        <Title order={1} mb="xs">
          Pokemons Collection
        </Title>

        <PokemonFilters
          currentPage={page}
          currentLimit={String(limit)}
          currentSortBy={sortBy}
          currentSortOrder={sortOrder}
          totalPages={totalPages}
        />

        <SimpleGrid cols={5} spacing="lg">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id!} pokemon={pokemon} />
          ))}
        </SimpleGrid>

        {pokemons.length === 0 && (
          <Text ta="center" c="dimmed">
            No Pokemons found
          </Text>
        )}
      </Stack>
    </Container>
  );
}
