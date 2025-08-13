import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BASE_URL || 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, { limit?: number; offset?: number }>({
      query: ({ limit = 20, offset = 0 } = {}) => 
        `pokemon?limit=${limit}&offset=${offset}`,
      providesTags: ['Pokemon'],
    }),
    getPokemonDetail: builder.query<PokemonDetail, string | number>({
      query: (id) => `pokemon/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Pokemon', id }],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonDetailQuery } = pokemonApi;