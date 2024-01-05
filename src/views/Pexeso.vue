<template>
  <section class="game">
    <header class="mb-10">
      <h1 class="font-bold text-2xl leading-6">Pexeso</h1>
      <br />
      <button
        class="reset-button"
        v-bind:disabled="state.isLoading"
        type="button"
        v-on:click="resetGame"
      >
        Reset game
      </button>
    </header>
    <div class="board">
      <ul class="cards">
        <li
          v-for="{ name, image } in state.cards"
          v-bind:key="name"
          class="card"
          tabindex="0"
          v-bind:data-id="name"
        >
          <div class="outer">
            <div class="inner">
              <img v-bind:src="image" v-bind:alt="name" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import axios from 'axios'

interface CardProps {
  name: string
  image: string
}

interface Pokemon {
  name: string
  url: string
}

interface State {
  cards: CardProps[]
  isLoading: boolean
}

const state = reactive<State>({
  cards: [],
  isLoading: false,
})

const fetchPokemons = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=32')
  const results = response.data.results.map((pokemon: Pokemon) => {
    const parts = pokemon.url.split('/').filter(Boolean)
    const id = parts[parts.length - 1] || 0
    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    }
  })

  return results.flatMap((obj: CardProps) => [{ ...obj }, { ...obj }])
}

const createTimeoutFunction =
  (pokemon: CardProps, currentDelay: number) => () =>
    setTimeout(() => {
      state.cards.push(pokemon)
    }, currentDelay)

const createCardList = () => {
  state.isLoading = true
  fetchPokemons()
    .then((pokemons) => {
      let delay = 50
      for (let i = 0; i <= pokemons.length; i += 1) {
        if (pokemons[i]) {
          const timeoutFunction = createTimeoutFunction(pokemons[i], 50 + delay)
          timeoutFunction()
        }
        delay += 50
      }

      return delay
    })
    .then((delay) => {
      setTimeout(() => {
        state.isLoading = false
      }, delay)
    })
}

const resetGame = () => {
  state.cards = []
  createCardList()
}

onMounted(async () => {
  await createCardList()
})
</script>

<style lang="postcss" scoped>
.reset-button {
  @apply rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50;
}

.reset-button:disabled {
  @apply text-gray-300;
  cursor: default;
  pointer-events: none;
}

.game {
  @apply flex justify-center items-center h-full flex-col w-full;
}
.board {
  @apply w-full;
  min-height: 590px;
}
.cards {
  @apply list-none m-0 p-0 grid grid-cols-8;
  grid-gap: 1px;
}

.card {
  cursor: pointer;
  position: relative;
  padding-top: 100%;
  outline: none;
  animation: deal 0.2s 1;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: perspective(100px) translateZ(0);

  &:before {
    display: none;
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 3;
    border: 3px solid transparent;
    transition: 0.15s cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  &:focus:before {
    @apply border-blue-600;
    display: block;
  }
}

.outer {
  @apply bg-stone-100;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border: 1px solid transparent;
  transition:
    background-color 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
    transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backface-visibility: hidden;
}

.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & img {
    width: 80%;
    height: 80%;
  }
}
@media screen and (device-aspect-ratio: 40/71) and (min-device-width: 320px) {
  .game {
    padding: 1rem;
    max-width: 100%;
  }
  .board {
    width: 100%;
    min-height: 1000px;
  }
}
@media screen and (min-device-aspect-ratio: 375/667) and (min-device-width: 375px) {
  .game {
    padding: 1rem;
    max-width: 100%;
  }
  .board {
    width: 100%;
    min-height: 1000px;
  }
}

@media screen and (min-device-width: 500px) {
  .game {
    padding: 2rem;
    max-width: 40rem;
  }
  .board {
    width: 100%;
    min-height: 590px;
  }
}

@keyframes deal {
  0% {
    transform: translate(10px, 0) perspective(500px) translateZ(100px);
  }
  100% {
    transform: translate(0, 0) perspective(500px) translateZ(0px);
  }
}
</style>
