<template>
  <div class="board">
    <ul class="list-none m-0 p-0 grid grid-cols-8 gap-0.5">
      <li
        v-for="card in cards"
        v-bind:key="card.name"
        class="card"
        tabindex="0"
        v-bind:data-id="card.name"
        v-on:keyup.enter.space="onCardPress"
        v-on:click="onCardPress"
        v-on:keyup.left.right.up.down="onCardMove"
      >
        <div class="shirt shirt-back"></div>
        <div class="shirt shirt-front">
          <img v-bind:src="card.image" v-bind:alt="card.name" class="picture" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, Ref } from 'vue'
import { useToast } from 'vue-toastification'
import { focusSibling } from './utils'

const toast = useToast()

const props = defineProps<{
  cards: Array<{ name: string; image: string }>
  updateGame: (action: string) => void
  isBoardBlocked: boolean
}>()

interface BoardState {
  previous: Ref<HTMLElement | null>
  current: Ref<HTMLElement | null>
}

const initialState: BoardState = {
  previous: ref(null),
  current: ref(null),
}

const state = reactive<BoardState>({ ...initialState })

const onCardMove = (event: KeyboardEvent) => {
  if (props.isBoardBlocked) return

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
const isCardMatched = computed(
  () => state.previous?.dataset.id === state.current?.dataset.id,
)
const onCardPress = (event: KeyboardEvent | MouseEvent) => {
  if (props.isBoardBlocked) return

  const target = event.target as HTMLElement

  if (target.classList.contains('opened')) return
  props.updateGame('totalActions')
  target.classList.add('opened')

  if (!state.previous) {
    state.previous = target
    return
  }

  if (!state.current) {
    state.current = target

    if (isCardMatched.value) {
      props.updateGame('scores')
      toast.success('Got one point!', {
        timeout: 2000,
      })
    }
    return
  }

  if (!isCardMatched.value) {
    state.current?.classList.remove('opened')
    state.previous?.classList.remove('opened')
  }

  state.previous = target
  state.current = null
}
</script>

<style scoped>
.board {
  @apply w-full;
  min-height: 590px;
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
      @apply bg-gray-100;
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
    @apply bg-gray-400;
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
  @apply bg-gray-100;
  transition:
    background-color 0.15s cubic-bezier(0.2, 0, 0.38, 0.9),
    transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  backface-visibility: hidden;
}

.shirt-back {
  @apply bg-gray-300;
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
