<template>
  <section class="w-full max-w-sm h-full">
    <header class="my-5">
      <h1 class="font-bold text-3xl">Settings</h1>
    </header>
    <InitialInput class="mb-16" />
    <LevelSwitcher />
  </section>
</template>

<script setup lang="ts">
import LevelSwitcher from '@components/LevelSwitcher'
import InitialInput from '@components/InitialInput'
</script>

<style scoped></style>
