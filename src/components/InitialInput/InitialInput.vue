<template>
  <section class="text-center">
    <h2 class="text-gray-400 text-xl">
      <label for="initials">Your Initials</label>
    </h2>
    <div class="w-full relative py-3 flex gap-2">
      <input
        id="initials"
        ref="inputRef"
        v-model="state.inputValue"
        v-bind:class="[
          'text-4xl font-bold uppercase bg-transparent text-center w-full cursor-pointer border-transparent rounded-md focus:bg-white',
          {
            'border-2 border-blue-600': state.isSaveButtonVisible,
          },
        ]"
        placeholder="Enter initials"
        maxlength="5"
        pattern="[A-Za-z0-9]{1,5}"
        title="5 characters max (letters and numbers only)"
        v-on:focus="toggleSaveButton(true)"
      />

      <BaseButton
        class="button"
        size="md"
        aria-label="Change initials"
        v-on:click="makeInputFocused"
      >
        <SvgIcon size="sm"><Pencil /></SvgIcon>
      </BaseButton>

      <BaseButton
        v-if="state.isSaveButtonVisible"
        class="button"
        size="md"
        aria-label="Save initials"
        v-on:click="saveInitials"
      >
        <SvgIcon size="sm"><Save /></SvgIcon>
      </BaseButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import useSettingsStore from '@store/settings'
import { useToast } from 'vue-toastification'
import SvgIcon, { Pencil, Save } from '@components/SvgIcon'
import BaseButton from '@components/BaseButton'

const settingsStore = useSettingsStore()

const inputRef = ref<HTMLElement | null>(null)

const state = reactive<{
  inputValue: string | null
  isSaveButtonVisible: boolean
}>({ inputValue: settingsStore.initials, isSaveButtonVisible: false })

const emits = defineEmits(['save'])

const toast = useToast()

const toggleSaveButton = (show: boolean) => {
  state.isSaveButtonVisible = show
  if (!show) {
    state.inputValue = settingsStore.initials
  }
}

const saveInitials = () => {
  if (
    state.inputValue?.match(/^[A-Za-z0-9]{1,5}$/) &&
    state.inputValue.length === 5
  ) {
    settingsStore.setInitials(state.inputValue)
    toggleSaveButton(false)
    toast.success('Initials Saved', { timeout: 2000 })
    emits('save')
  } else {
    state.inputValue = settingsStore.initials
    toggleSaveButton(false)
    toast.error('Invalid input. Please enter up to 5 letters and numbers.', {
      timeout: 2000,
    })
  }
}

const makeInputFocused = () => {
  inputRef.value?.focus()
  toggleSaveButton(true)
}

watch(state, (newState) => {
  if (newState.inputValue !== settingsStore.initials) {
    state.isSaveButtonVisible = true
  }
})
</script>

<style scoped lang="postcss">
.button {
  @apply absolute right-1 top-1/2 -mt-5;

  &:disabled {
    @apply pointer-events-none opacity-20 cursor-default;
    cursor: default;
    pointer-events: none;
  }
  &:hover {
    @apply text-blue-800;
  }
}
</style>
