<template>
  <div style="text-align:center">
    <button @click="goBack">返回</button>

    <h2>Vue Dino Game</h2>

    <canvas
      ref="canvasRef"
      width="400"
      height="200"
      style="border:1px solid black"
    ></canvas>

    <p>Press SPACE to jump</p>

    <p v-if="gameOver">Game Over</p>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { useRouter } from 'vue-router'

const canvasRef = ref(null)
const router = useRouter()

let ctx
let dinosaur = {
  x: 50,
  y: 120,
  width: 40,
  height: 40,
  vy: 0,
  jumping: false
}

let gravity = 0.6
let ground = 160

let obstacles = []
let frame = 0
let score = ref(0)
let gameOver = ref(false)

function restart() {

  dinosaur.y = 120
  dinosaur.vy = 0
  dinosaur.jumping = false

  obstacles = []
  frame = 0

  score.value = 0
  gameOver.value = false
}

function spawnObstacle() {
  obstacles.push({
    x: 400,
    y: 140,
    width: 20,
    height: 40
  })
}

function jump() {
  if (!dinosaur.jumping) {
    dinosaur.vy = -12
    dinosaur.jumping = true
  }
}

function update() {

  if (gameOver.value) return

  frame++
  score.value++

  if (frame % 120 === 0) {
    spawnObstacle()
  }

  dinosaur.vy += gravity
  dinosaur.y += dinosaur.vy

  if (dinosaur.y >= ground - dinosaur.height) {
    dinosaur.y = ground - dinosaur.height
    dinosaur.vy = 0
    dinosaur.jumping = false
  }

  obstacles.forEach(o => {
    o.x -= 4
  })

  obstacles = obstacles.filter(o => o.x > -20)

  checkCollision()
}

function checkCollision() {
  obstacles.forEach(o => {
    if (
      dinosaur.x < o.x + o.width &&
      dinosaur.x + dinosaur.width > o.x &&
      dinosaur.y < o.y + o.height &&
      dinosaur.y + dinosaur.height > o.y
    ) {
      gameOver.value = true
    }
  })
}

function draw() {

  ctx.clearRect(0, 0, 400, 200)

  ctx.fillStyle = "black"

  // ground
  ctx.fillRect(0, ground, 400, 2)

  // dinosaur
  ctx.fillRect(
    dinosaur.x,
    dinosaur.y,
    dinosaur.width,
    dinosaur.height
  )

  // obstacles
  obstacles.forEach(o => {
    ctx.fillRect(o.x, o.y, o.width, o.height)
  })

  ctx.fillText("Score: " + score.value, 10, 20)

  if (gameOver.value) {
    ctx.fillText("GAME OVER", 150, 100)
  }
}

function gameLoop() {
  update()
  draw()
  requestAnimationFrame(gameLoop)
}

function goBack() {
  router.back()
}

onMounted(() => {

  const canvas = canvasRef.value
  ctx = canvas.getContext("2d")

  window.addEventListener("keydown", e => {

    if (gameOver.value) {
      restart()
      return
    }

    if (e.code === "Space") {
      jump()
    }

  })

  gameLoop()
})

</script>