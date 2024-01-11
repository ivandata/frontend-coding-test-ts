<template>
  <header class="flex gap-10 w-full text-left h-full items-center">
    <h1 class="font-bold text-2xl">
      <span class="text-gray-500 text-xl">Initials</span>
      <br />
      <span class="uppercase" aria-label="Your initials are">
        {{ setting.initials }}
      </span>
    </h1>
    <h2 class="font-bold text-2xl">
      <span class="text-gray-500 text-xl">Difficulty</span>
      <br />
      <span class="uppercase" aria-label="Current game difficulty level is">
        {{ setting.gameLevel }}
      </span>
    </h2>
  </header>
</template>
<script setup lang="ts">
import useSettingsStore from '@store/settings'

const setting = useSettingsStore()
</script>
