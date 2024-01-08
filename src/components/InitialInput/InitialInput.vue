<template>
  <section class="text-center">
    <h2 class="text-gray-400 text-xl">
      <label for="initials">Your Initials</label>
    </h2>
    <div class="w-full relative py-3 flex gap-2">
      <input
        id="initials"
        ref="inputRef"
        v-model="inputValue"
        v-bind:class="[
          'text-4xl font-bold uppercase bg-transparent text-center w-full cursor-pointer border-transparent rounded-md focus:bg-white',
          {
            'border-2 border-blue-600': showSaveButton,
          },
        ]"
        placeholder="Enter initials"
        maxlength="5"
        pattern="[A-Za-z0-9]{1,5}"
        title="5 characters max (letters and numbers only)"
        v-on:focus="toggleSaveButton(true)"
      />

      <button
        class="button"
        type="button"
        aria-label="Change initials"
        v-on:click="makeInputFocused"
      >
        <span class="w-full h-full block text-gray-800">
          <svg class="w-full h-full">
            <use xlink:href="#pencil">
              <symbol id="pencil" viewBox="0 0 512 512">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="44"
                  d="M358.62 129.28L86.49 402.08 70 442l39.92-16.49 272.8-272.13-24.1-24.1zM413.07 74.84l-11.79 11.78 24.1 24.1 11.79-11.79a16.51 16.51 0 000-23.34l-.75-.75a16.51 16.51 0 00-23.35 0z"
                ></path>
              </symbol>
            </use>
          </svg>
        </span>
      </button>

      <button
        v-if="showSaveButton"
        class="button"
        type="button"
        aria-label="Save initials"
        v-on:click="saveInitials"
      >
        <span class="w-full h-full block">
          <svg class="w-full h-full">
            <use xlink:href="#save">
              <symbol id="save" class="ionicon" viewBox="0 0 512 512">
                <path
                  d="M465.94 119.76l-73.7-73.7A47.68 47.68 0 00358.3 32H96a64 64 0 00-64 64v320a64 64 0 0064 64h320a64 64 0 0064-64V153.7a47.68 47.68 0 00-14.06-33.94zM120 112h176a8 8 0 018 8v48a8 8 0 01-8 8H120a8 8 0 01-8-8v-48a8 8 0 018-8zm139.75 319.91a80 80 0 1176.16-76.16 80.06 80.06 0 01-76.16 76.16z"
                  fill="currentColor"
                  stroke="currentColor"
                ></path>
                <circle
                  cx="256"
                  cy="352"
                  r="48"
                  fill="currentColor"
                  stroke="currentColor"
                ></circle>
              </symbol>
            </use>
          </svg>
        </span>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import useSettingsStore from '@store/settings'
import { useToast } from 'vue-toastification' // Adjust path as needed

const settingsStore = useSettingsStore()
const inputValue = ref(settingsStore.initials)
const showSaveButton = ref(false)
const inputRef = ref<HTMLElement | null>(null)

const toast = useToast()

const toggleSaveButton = (show: boolean) => {
  showSaveButton.value = show
  if (!show) {
    inputValue.value = settingsStore.initials
  }
}

const saveInitials = () => {
  if (
    inputValue.value?.match(/^[A-Za-z0-9]{1,5}$/) &&
    inputValue.value.length === 5
  ) {
    settingsStore.setInitials(inputValue.value)
    toggleSaveButton(false)
    toast.success('Initials Saved', { timeout: 2000 })
  } else {
    inputValue.value = settingsStore.initials
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

watch(inputValue, (newValue) => {
  if (newValue !== settingsStore.initials) {
    showSaveButton.value = true
  }
})
</script>

<style scoped>
.button {
  @apply p-2 border-2 rounded-full bg-white border-solid text-blue-800 h-10 w-10 flex justify-center items-center absolute right-1 top-1/2 -mt-5;

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
