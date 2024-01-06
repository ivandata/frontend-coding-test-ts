<template>
  <section class="game">
    <header class="mb-5">
      <h1 class="font-bold text-2xl leading-6">Pexeso</h1>
    </header>
    <div class="flex flex-row justify-between w-full mb-5 h-10">
      <div class="flex flex-row gap-5 items-center">
        <button
          class="reset-button"
          v-bind:disabled="isResetButtonDisabled"
          type="button"
          v-on:click="resetGame"
        >
          Reset game
        </button>
        <button
          class="reset-button"
          v-bind:disabled="isStartButtonDisabled"
          type="button"
          v-on:click="startGame"
        >
          Start game
        </button>
      </div>
      <div v-if="state.isGameStarted" class="text-2xl">
        <div v-if="state.preparationTime">
          Get Ready: {{ state.preparationTime }}
        </div>
        <div v-else-if="state.gameTime">
          <div class="text-xs">Remaining time</div>
          {{ formattedGameTime }}
        </div>
      </div>
    </div>
    <div class="board">
      <ul class="cards">
        <li
          v-for="{ name, image } in state.cards"
          v-bind:key="name"
          class="card"
          tabindex="0"
          v-bind:data-id="name"
          v-on:keyup.enter.space="onCardPress"
          v-on:click="onCardPress"
          v-on:keyup.left.right.up.down="onCardMove"
        >
          <div class="shirt shirt-back"></div>
          <div class="shirt shirt-front">
            <div class="picture">
              <img v-bind:src="image" v-bind:alt="name" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, Ref, watch, computed } from 'vue'
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
  previous: Ref<HTMLElement | null>
  current: Ref<HTMLElement | null>
  isGameStarted: boolean
  isGameFinished: boolean
  gameTime: number
  preparationTime: number
  scores: number
  totalCards: number
}

let preparationInterval: ReturnType<typeof setInterval>
let gameInterval: ReturnType<typeof setInterval>

const initialState: State = {
  cards: [],
  isLoading: false,
  previous: ref(null),
  current: ref(null),
  isGameStarted: false,
  preparationTime: 5,
  gameTime: 65, // 3 minutes in seconds
  isGameFinished: false,
  scores: 0,
  totalCards: 32,
}

const state = reactive<State>({ ...initialState })

const setDefaultState = () => {
  Object.assign(state, { ...initialState, ...{ cards: [] } })
}

const isResetButtonDisabled = computed(
  () => state.isLoading || !state.isGameStarted || state.preparationTime,
)

const isStartButtonDisabled = computed(
  () => state.isLoading || state.isGameStarted,
)

const formattedGameTime = computed(() => {
  const minutes = Math.floor(state.gameTime / 60)
  const seconds = state.gameTime % 60

  // Format the minutes and seconds to always have two digits
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  return state.gameTime >= 60
    ? `${formattedMinutes}:${formattedSeconds}`
    : `${formattedSeconds} sec`
})

const shuffleElements = (cardsCollection: CardProps[]) => {
  const result = cardsCollection
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const fetchPokemons = async () => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${state.totalCards}`,
  )
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

const focusSibling = (
  element: Element | null,
  next: boolean,
  skipCount = 0,
) => {
  let elementToFocus = element
  for (let i = 0; i <= skipCount; i += 1) {
    if (!element) return
    elementToFocus = next
      ? elementToFocus?.nextElementSibling || null
      : elementToFocus?.previousElementSibling || null
  }

  ;(elementToFocus as HTMLElement)?.focus()
}

const onCardMove = (event: KeyboardEvent) => {
  if (state.isLoading) return

  const { activeElement } = document

  switch (event.code) {
    case 'ArrowRight':
      focusSibling(activeElement, true)
      break
    case 'ArrowLeft':
      focusSibling(activeElement, false)
      break
    case 'ArrowUp':
      focusSibling(activeElement, false, 7)
      break
    case 'ArrowDown':
      focusSibling(activeElement, true, 7)
      break
    default:
      break
  }
}

const onCardPress = (event: KeyboardEvent | MouseEvent) => {
  if (state.isLoading) return

  const target = event.target as HTMLElement

  if (target.classList.contains('opened')) return
  target.classList.add('opened')

  if (!state.previous) {
    state.previous = target
    return
  }

  if (!state.current) {
    state.current = target
    return
  }

  if (state.previous?.dataset.id === state.current?.dataset.id) {
    state.scores += 1
  } else {
    state.current?.classList.remove('opened')
    state.previous?.classList.remove('opened')
  }

  state.previous = target
  state.current = null
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
      return shuffleElements(pokemons)
    })
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
  setDefaultState()
  clearInterval(preparationInterval)
  clearInterval(gameInterval)
  createCardList()
}

const startGameTimer = () => {
  gameInterval = setInterval(() => {
    state.gameTime -= 1
    if (state.gameTime <= 0) {
      clearInterval(gameInterval)
      state.isGameFinished = true
      state.isGameStarted = false
    }
  }, 1000)
}

const startPreparationTimer = () => {
  state.isGameStarted = true
  preparationInterval = setInterval(() => {
    state.preparationTime -= 1
    if (state.preparationTime <= 0) {
      clearInterval(preparationInterval)
      startGameTimer()
    }
  }, 1000)
}

const startGame = () => {
  setDefaultState()
  createCardList()
  startPreparationTimer()
}

watch(
  () => state.isGameFinished,
  (newValue) => {
    if (newValue) {
      // send feedback to the user
      // set scores to table with username
    }
  },
)

watch(
  () => state.scores,
  (newValue) => {
    if (newValue === state.totalCards) {
      // send feedback to the user
      // set scores to table  with username
    }
  },
)

onMounted(async () => {
  setDefaultState()
  await createCardList()
})
</script>

<style lang="postcss" scoped>
.reset-button {
  @apply rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50;

  &:disabled {
    @apply text-gray-300;
    cursor: default;
    pointer-events: none;
  }
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
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  padding-top: 100%;
  outline: none;
  animation: deal 0.2s 1;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: perspective(100px) translateZ(0);

  &.opened {
    cursor: auto;

    &:active {
      transform: perspective(300px) translateZ(-10px);
    }

    & .shirt-back {
      transform: rotateY(-180deg);
    }

    & .shirt-front {
      @apply bg-stone-100;
      transform: rotateY(0);
      z-index: 2;
    }
  }

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
    display: block;
    @apply border-blue-600;
  }

  &:hover .shirt-back {
    @apply bg-stone-400;
  }

  &:focus .shirt-front,
  &:focus .shirt-back {
    outline: none;
    z-index: 1;
  }
}

.shirt {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  border: 1px solid transparent;
  @apply bg-stone-100;
  transition:
    background-color 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
    transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backface-visibility: hidden;
}

.shirt-back {
  @apply bg-stone-300;
}
.shirt-front {
  transform: rotateY(180deg);
}

.picture {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  img {
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
