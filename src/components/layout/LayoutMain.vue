<template>
  <nav class="bg-gray-800 text-white">
    <div class="mx-auto px-8">
      <div class="relative flex items-center justify-between h-16">
        <div
          class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex-shrink-0 flex items-center">
            <img class="w-14 h-14" src="../../assets/logo.svg" />
            <img class="ml-3" src="../../assets/logotype.svg" />
          </div>
          <div class="flex ml-10 items-center align-middle">
            <div class="flex space-x-4">
              <template v-for="{ path, name } in routes" v-bind:key="name">
                <router-link
                  v-bind:to="{ path }"
                  class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
                  exact-active-class="bg-gray-900 text-white"
                >
                  {{ name }}
                </router-link>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <main class="flex-1 flex justify-center">
    <router-view />
  </main>
</template>

<script setup lang="ts">
import mainRoutes from '../../router/routes'

const routes = mainRoutes
</script>
