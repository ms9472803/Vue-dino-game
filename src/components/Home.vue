<template>
  <div class="home-page">
    <img class="welcome-image" :src="welcomeImage" alt="Welcome" />
    <h1>Welcome</h1>
    <button @click="goGamePage">Start</button>
    <button @click="goSettingsPage">Settings</button>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ROUTE_PATHS } from '../constants/routes'
import welcomeImage from '../assets/logo.svg'

const router = useRouter()

function goGamePage() {
  router.push(ROUTE_PATHS.GAME)
}

function goSettingsPage() {
  router.push(ROUTE_PATHS.SETTINGS)
}
</script>

<style scoped>
.home-page {
  display: grid;
  gap: 1rem;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
  text-align: center;
}

.home-page h1 {
  margin: 0 0 1rem;
}

.welcome-image {
  width: 96px;
  height: 96px;
  margin: 0 auto 0.5rem;
  object-fit: contain;
}

.home-page button {
  padding: 0.75rem 1.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
}

.home-page button:hover {
  background: #f0f0f0;
}
</style>