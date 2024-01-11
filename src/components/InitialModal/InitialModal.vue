<template>
  <VueFinalModal
    modal-id="initial-modal"
    class="flex justify-center items-center"
    content-class="flex flex-col p-4 bg-white rounded border border-gray-100 dark:border-gray-800 max-w-2xl justify-center items-center"
  >
    <section class="text-center mb-10">
      <header>
        <h1 class="font-bold text-2xl">Welcome to the Pexeso board!</h1>
      </header>
      <p>
        Before you start playing, you need to enter your initial. <br />
        You can always change initials and game level on the
        <router-link
          to="/settings"
          class="font-medium font-bold inline-block text-blue-900"
          exact-active-class="bg-gray-900 text-white"
        >
          settings page
        </router-link>
        .
      </p>
    </section>
    <InitialInput class="max-w-sm" v-on:save="close('initial-modal')" />
  </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
import InitialInput from '@components/InitialInput'

const { close } = useVfm()
</script>
