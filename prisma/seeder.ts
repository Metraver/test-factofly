const MAX_COUNT = 60; // max 1350;
const POKEMON_API_URL = 'https://pokeapi.co/api/v2';
import { prisma } from './prisma-client';

interface PokemonListRequest {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

interface PokemonDataRequest {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
}

seedDatabaseWithPokemons();

async function seedDatabaseWithPokemons() {
  let offset = 0;
  let nextUrl: string | null = `${POKEMON_API_URL}/pokemon?offset=0&limit=20`;

  while (offset < MAX_COUNT && nextUrl !== null) {
    const response = await fetch(nextUrl);
    const pokemonsList: PokemonListRequest = await response.json();

    nextUrl = pokemonsList.next;
    offset += 20;

    for (const pokemon of pokemonsList.results) {
      const pokemonData = await fetch(`${pokemon.url}`);
      const pokemonDataJson: PokemonDataRequest = await pokemonData.json();
      if (pokemonDataJson) {
        await prisma.pokemons.create({
          data: {
            name: pokemon.name,
            externalId: pokemonDataJson.id,
            height: pokemonDataJson.height,
            weight: pokemonDataJson.weight,
            imageUrl: pokemonDataJson.sprites.front_default,
          },
        });
      }
    }
    console.log(`Processed ${offset} pokemons of ${MAX_COUNT}`);
  }

  console.log('Database is seeded with pokemon data§');
}
