<template>
  <div
    class="min-w-full min-h-screen font-sans text-sm antialiased bg-gray-50 text-center"
  >
    <router-view />
  </div>
  <ModalsContainer />
</template>

<script setup lang="ts">
import { ModalsContainer } from 'vue-final-modal'
</script>
