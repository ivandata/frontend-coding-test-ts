<template>
  <section class="game">
    <GameHeader class="header" />
    <div class="controls">
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
import { computed, onMounted, reactive, watch } from 'vue'
import { useModal } from 'vue-final-modal'
import {
  GameControls,
  GameHeader,
  GameBoard,
  GameStatus,
  CardProps,
  processCards,
  calculateScore,
} from '@components/Game'
import useFetch, { ApiResponse } from '@api/index'
import InitialModal from '@components/InitialModal'
import useScoresStore from '@store/scores'
import useSettingsStore from '@store/settings'

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

const { gameLevel, initials } = settingsStore

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

const createTimeoutFunction =
  (pokemon: CardProps, currentDelay: number) => () =>
    setTimeout(() => {
      state.cards.push(pokemon)
    }, currentDelay)

const updateCardsState = (cards: CardProps[]): number => {
  let delay = 50
  for (let i = 0; i <= cards.length; i += 1) {
    if (cards[i]) {
      const timeoutFunction = createTimeoutFunction(cards[i], 50 + delay)
      timeoutFunction()
    }
    delay += 50
  }
  return delay
}

const createCardList = () => {
  state.isLoading = true
  const { fetchData } = useFetch<ApiResponse>(
    'https://pokeapi.co/api/v2/pokemon?limit=100',
  )

  fetchData()
    .then((data) => processCards(data, gameLevel))
    .then((cards) => updateCardsState(cards))
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

const { open } = useModal({
  component: InitialModal,
})

onMounted(() => {
  if (!settingsStore.initials) {
    open()
  }
  setDefaultState()
  createCardList()
})
</script>

<style lang="postcss" scoped>
.game {
  @apply flex justify-center items-center h-full flex-col w-full gap-6;
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
  @apply h-full flex flex-row justify-between w-full bg-white py-3 px-2 rounded-md border-2 border-gray-100 border-solid;
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
