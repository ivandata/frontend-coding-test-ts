<template>
  <header class="flex gap-10 w-full text-left h-full items-center">
    <h1 class="font-bold text-2xl">
      <div class="text-gray-400 text-xl">Initials</div>
      <div>{{ setting.initials }}</div>
    </h1>
    <h2 class="font-bold text-2xl">
      <div class="text-gray-400 text-xl">Difficulty</div>
      <div class="uppercase">{{ setting.gameLevel }}</div>
    </h2>
  </header>
</template>
<script setup lang="ts">
import useSettingsStore from '@store/settings'

const setting = useSettingsStore()
</script>
