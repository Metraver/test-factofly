import { prisma } from '@/prisma/prisma-client';
import { validateData } from '@/src/lib/validation';
import { z } from 'zod';
export type SortField = 'name' | 'height' | 'weight';
export type SortOrder = 'asc' | 'desc';

export interface GetPokemonsParams {
  limit?: 10 | 20 | 50;
  page?: number;
  sortBy?: SortField;
  sortOrder?: SortOrder;
  name?: string;
}

export interface Pokemon {
  id: string;
  name: string;
  height: number;
  weight: number;
  imageUrl: string;
  externalId: number;
}

export interface GetPokemonsResult {
  pokemons: Pokemon[];
  total: number;
  page: number;
  totalPages: number;
  error?: string;
}

const schema = z
  .object({
    limit: z.union([z.literal(10), z.literal(20), z.literal(50)]),
    page: z.number().min(1),
    sortBy: z.enum(['name', 'height', 'weight']),
    sortOrder: z.enum(['asc', 'desc']),
  })
  .strict();

export async function getPokemonsQuery(
  options: GetPokemonsParams = {},
): Promise<GetPokemonsResult> {
  const { limit = 20, page = 1, sortBy = 'name', sortOrder = 'asc' } = options;
  const offset = (page - 1) * limit;
  
  const result = validateData(schema, {
    ...options, // to validate that all option keys are valid
    limit,
    page,
    sortBy,
    sortOrder,
  });
  
  if (!result.success) {
    return {
      pokemons: [],
      total: 0,
      page: 1,
      totalPages: 1,
      error: 'INVALID_QUERY',
    };
  }

  const where: Record<string, unknown> = {
    deletedAt: null,
  };

  const total = await prisma.pokemons.count({ where });

  const pokemons = await prisma.pokemons.findMany({
    where,
    orderBy: {
      [sortBy]: sortOrder,
    },
    skip: offset,
    take: limit,
  });

  return {
    pokemons,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
