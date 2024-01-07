<template>
  <section
    class="game flex justify-center items-center h-full flex-col w-full gap-6"
  >
    <GameHeader class="header" />
    <div
      class="controls h-full flex flex-row justify-between w-full bg-white py-3 px-2 rounded-md border-2 border-gray-300 border-solid"
    >
      <GameControls
        v-bind:is-game-started="state.isGameStarted"
        v-bind:is-loading="state.isLoading"
        v-bind:preparation-time="Boolean(state.preparationTime)"
        v-on:reset="resetGame"
        v-on:start="startGame"
      />
      <GameStatus
        v-bind:is-game-started="state.isGameStarted"
        v-bind:preparation-time="state.preparationTime"
        v-bind:game-time="state.gameTime"
      />
    </div>
    <GameBoard
      class="board"
      v-bind:cards="state.cards"
      v-bind:is-loading="state.isLoading"
      v-bind:update-game="updateGame"
      v-bind:is-board-blocked="isBoardBlocked"
    />
  </section>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import {
  GameControls,
  GameHeader,
  GameBoard,
  GameStatus,
  CardProps,
  shuffleElements,
  calculateScore,
  useFetch,
  formatResults,
  GameDifficulty,
} from '@components/game'
import useScoresStore from '@store/scores'
import useSettingsStore from '@store/settings'

// Define the state and types as necessary
interface GameState {
  cards: CardProps[]
  isLoading: boolean
  isGameStarted: boolean
  isGameFinished: boolean
  gameTime: number
  preparationTime: number
  scores: number
  totalCards: number
  totalActions: number
  lastResults: number
}

let preparationInterval: ReturnType<typeof setInterval>
let gameInterval: ReturnType<typeof setInterval>

const scoresStore = useScoresStore()
const settingsStore = useSettingsStore()

const initialState: GameState = {
  cards: [],
  isLoading: false,
  isGameStarted: false,
  preparationTime: 5,
  gameTime: 60,
  isGameFinished: false,
  scores: 0,
  totalCards: 16,
  totalActions: 0,
  lastResults: 0,
}

const state = reactive<GameState>({ ...initialState })

const setDefaultState = () => {
  Object.assign(state, { ...initialState, ...{ cards: [] } })
}

const isBoardBlocked = computed(
  () =>
    state.isLoading || !state.isGameStarted || Boolean(state.preparationTime),
)

// move to config

const url = ref(`https://pokeapi.co/api/v2/pokemon?limit=100`)

const createTimeoutFunction =
  (pokemon: CardProps, currentDelay: number) => () =>
    setTimeout(() => {
      state.cards.push(pokemon)
    }, currentDelay)

const createCardList = () => {
  state.isLoading = true
  const { fetchData } = useFetch(url.value)

  fetchData()
    .then(({ data }) => {
      const results = formatResults(data)
      const cards = shuffleElements(results)
        .slice(0, GameDifficulty[settingsStore.gameLevel].cards)
        .flatMap((obj: CardProps) => [{ ...obj }, { ...obj }])

      return shuffleElements(cards)
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

const getGameResults = () => {
  state.isGameStarted = false

  clearInterval(preparationInterval)
  clearInterval(gameInterval)
  const { gameTime, scores, totalActions, totalCards } = state

  state.lastResults = calculateScore({
    gameTime,
    scores,
    totalActions,
    totalCards,
  })
  if (!state.lastResults) return

  const { gameLevel, initials } = settingsStore
  scoresStore.addResults(gameLevel, {
    initials,
    scores: state.lastResults,
  })
}

const isGameOver = computed(() => {
  return state.scores === state.totalCards || state.isGameFinished
})

watch(isGameOver, (newValue, oldValue) => {
  if (newValue && !oldValue) {
    getGameResults()
  }
})

const updateGame = (updateType: 'scores' | 'totalActions') => {
  state[updateType] += 1
}

onMounted(() => {
  setDefaultState()
  createCardList()
})
</script>

<style lang="postcss" scoped>
.game {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px auto;
  grid-template-areas:
    'header controls'
    'board board';
}
.header {
  grid-area: header;
}

.controls {
  grid-area: controls;
}
.board {
  grid-area: board;
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
@media screen and (max-width: 500px) {
  .game {
    grid-template-areas:
      'header'
      'controls'
      'board';
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }
}
</style>
