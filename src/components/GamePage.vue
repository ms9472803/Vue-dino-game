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

    <p>Score: {{ score }}</p>
    <p>Press SPACE to jump</p>

    <p v-if="gameOver">Game Over</p>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useRouter } from 'vue-router'

type Difficulty = 'easy' | 'normal' | 'hard'

interface Dinosaur {
  x: number
  y: number
  width: number
  height: number
  vy: number
  jumping: boolean
}

interface Obstacle {
  x: number
  y: number
  width: number
  height: number
  passed: boolean
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const router = useRouter()

let ctx: CanvasRenderingContext2D
let dinosaur: Dinosaur = {
  x: 50,
  y: 120,
  width: 40,
  height: 40,
  vy: 0,
  jumping: false
}

let gravity = 0.6
let ground = 160

let obstacles: Obstacle[] = []
let frame = 0
let score = ref(0)
let gameOver = ref(false)
let animationId: number | null = null
let obstacleSpeed = 4

const storageKey = 'dino-game-settings'
const defaultDifficulty: Difficulty = 'normal'
const obstacleSpeedByDifficulty: Record<Difficulty, number> = {
  easy: 3,
  normal: 4,
  hard: 6
}

function loadDifficulty(): Difficulty {
  try {
    const savedValue = localStorage.getItem(storageKey)

    if (!savedValue) {
      return defaultDifficulty
    }

    const parsed = JSON.parse(savedValue) as { difficulty?: string }

    if (parsed.difficulty === 'easy' || parsed.difficulty === 'normal' || parsed.difficulty === 'hard') {
      return parsed.difficulty
    }

    return defaultDifficulty
  } catch {
    return defaultDifficulty
  }
}

function handleKeydown(e: KeyboardEvent): void {

  if (gameOver.value) {
    restart()
    return
  }

  if (e.code === "Space") {
    jump()
  }
}

function restart(): void {
  dinosaur.y = 120
  dinosaur.vy = 0
  dinosaur.jumping = false

  obstacles = []
  frame = 0

  score.value = 0
  gameOver.value = false
}

function spawnObstacle(): void {
  obstacles.push({
    x: 400,
    y: 140,
    width: 20,
    height: 40,
    passed: false
  })
}

function jump(): void {
  if (!dinosaur.jumping) {
    dinosaur.vy = -12
    dinosaur.jumping = true
  }
}

function update(): void {

  if (gameOver.value) return

  frame++

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
    o.x -= obstacleSpeed

    if (!o.passed && o.x + o.width < dinosaur.x) {
      o.passed = true
      score.value += 1

      if (score.value > 0 && score.value % 10 === 0) {
        obstacleSpeed += 2
      }
    }
  })

  obstacles = obstacles.filter(o => o.x > -20)

  checkCollision()
}

function checkCollision(): void {
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

function draw(): void {

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

  if (gameOver.value) {
    ctx.fillText("GAME OVER", 150, 100)
  }
}

function gameLoop(): void {
  update()
  draw()
  animationId = requestAnimationFrame(gameLoop)
}

function goBack(): void {
  router.back()
}

onMounted(() => {

  const canvas = canvasRef.value!
  ctx = canvas.getContext("2d")!
  const difficulty = loadDifficulty()
  obstacleSpeed = obstacleSpeedByDifficulty[difficulty]

  window.addEventListener("keydown", handleKeydown)

  gameLoop()
})

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown)

  if (animationId !== null) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
})

</script>