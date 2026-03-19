<template>
  <div>
    <h1>Root Page</h1>
    <button @click="goA">Go to Page A</button>
    <button @click="goB">Go to Page B</button>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goA() {
  router.push('/a')
}

function goB() {
  router.push('/b')
}
</script>