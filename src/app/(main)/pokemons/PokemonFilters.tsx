'use client';

import {
  Group,
  Stack,
  Select,
  ActionIcon,
  Pagination,
  Center,
} from '@mantine/core';
import { IconArrowUp, IconArrowDown } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PokemonFiltersProps {
  currentPage: number;
  currentLimit: string;
  currentSortBy: string;
  currentSortOrder: string;
  totalPages: number;
}

export function PokemonFilters({
  currentPage,
  currentLimit,
  currentSortBy,
  currentSortOrder,
  totalPages,
}: PokemonFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(String(searchParams));

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    router.push(`?${String(params)}`);
  };

  const handlePageChange = (page: number) => {
    updateSearchParams({ page: String(page) });
  };

  const handleLimitChange = (value: string | null) => {
    if (value) {
      updateSearchParams({ limit: value, page: '1' });
    }
  };

  const handleSortByChange = (value: string | null) => {
    if (value) {
      updateSearchParams({ sortBy: value });
    }
  };

  const toggleSortOrder = () => {
    updateSearchParams({
      sortOrder: currentSortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  return (
    <Stack gap="md">
      <Group grow>
        <Select
          label="Items per page"
          data={[
            { value: '10', label: '10' },
            { value: '20', label: '20' },
            { value: '50', label: '50' },
          ]}
          value={currentLimit}
          onChange={handleLimitChange}
        />
        <Group gap="xs">
          <Select
            label="Sort by"
            data={[
              { value: 'name', label: 'Name' },
              { value: 'height', label: 'Height' },
              { value: 'weight', label: 'Weight' },
            ]}
            value={currentSortBy}
            onChange={handleSortByChange}
            style={{ flex: 1 }}
          />
          <ActionIcon
            size="lg"
            mt={24}
            onClick={toggleSortOrder}
            title={currentSortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {currentSortOrder === 'asc' ? (
              <IconArrowUp size={18} />
            ) : (
              <IconArrowDown size={18} />
            )}
          </ActionIcon>
        </Group>
      </Group>

      {totalPages > 1 && (
        <Center>
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={handlePageChange}
          />
        </Center>
      )}
    </Stack>
  );
}
