import { http, HttpResponse } from 'msw'

const mockPokemonList = {
  count: 1302,
  next: "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
  previous: null,
  results: [
    { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
    { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
    { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/" },
    { name: "charmander", url: "https://pokeapi.co/api/v2/pokemon/4/" },
    { name: "charmeleon", url: "https://pokeapi.co/api/v2/pokemon/5/" }
  ]
}

const mockPokemonDetail = {
  id: 1,
  name: "bulbasaur",
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    other: {
      'official-artwork': {
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
      }
    }
  },
  types: [
    {
      type: {
        name: "grass"
      }
    },
    {
      type: {
        name: "poison"
      }
    }
  ],
  stats: [
    {
      base_stat: 45,
      stat: {
        name: "hp"
      }
    },
    {
      base_stat: 49,
      stat: {
        name: "attack"
      }
    },
    {
      base_stat: 49,
      stat: {
        name: "defense"
      }
    },
    {
      base_stat: 65,
      stat: {
        name: "special-attack"
      }
    },
    {
      base_stat: 65,
      stat: {
        name: "special-defense"
      }
    },
    {
      base_stat: 45,
      stat: {
        name: "speed"
      }
    }
  ]
}

export const handlers = [
  // Get Pokemon list
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json(mockPokemonList)
  }),

  // Get specific Pokemon detail
  http.get('https://pokeapi.co/api/v2/pokemon/:id', ({ params }) => {
    const { id } = params
    return HttpResponse.json({
      ...mockPokemonDetail,
      id: parseInt(id as string),
      name: id === '1' ? 'bulbasaur' : `pokemon-${id}`
    })
  })
]
