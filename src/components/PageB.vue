<template>
  <div>
    <h1>Page B</h1>
    <button @click="goBack">返回</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}
</script>