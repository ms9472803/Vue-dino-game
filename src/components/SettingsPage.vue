<template>
  <section class="settings-page">
    <div class="settings-header">
      <button class="back-button" @click="goBack">返回</button>
      <div>
        <h1 class="eyebrow">設定頁</h1>
        <p class="subtitle">儲存後會保留在瀏覽器中。</p>
      </div>
    </div>

    <form class="settings-card" @submit.prevent="saveSettings">
      <label class="field">
        <span>玩家名稱</span>
        <input v-model.trim="settings.playerName" type="text" maxlength="20" placeholder="輸入你的名字" />
      </label>

      <label class="field">
        <span>遊戲難度</span>
        <select v-model="settings.difficulty">
          <option value="easy">Easy</option>
          <option value="normal">Normal</option>
          <option value="hard">Hard</option>
        </select>
      </label>

      <label class="toggle-row">
        <div>
          <span class="toggle-title">音效</span>
        </div>
        <input v-model="settings.soundEnabled" type="checkbox" />
      </label>

      <div class="actions">
        <button type="submit">儲存設定</button>
        <button type="button" class="secondary-button" @click="resetSettings">重設為預設值</button>
      </div>

      <p class="status" :class="{ success: statusType === 'success', error: statusType === 'error' }">
        {{ statusMessage }}
      </p>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const storageKey = 'dino-game-settings'
const defaultSettings = {
  playerName: '',
  difficulty: 'normal',
  soundEnabled: true
}

const settings = reactive(loadSettings())
const statusMessage = ref('尚未儲存變更')
const statusType = ref('')

function loadSettings() {
  try {
    const savedValue = localStorage.getItem(storageKey)

    if (!savedValue) {
      return { ...defaultSettings }
    }

    return {
      ...defaultSettings,
      ...JSON.parse(savedValue)
    }
  } catch {
    return { ...defaultSettings }
  }
}

function saveSettings() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ ...settings }))
    statusMessage.value = '設定已儲存'
    statusType.value = 'success'
  } catch {
    statusMessage.value = '設定儲存失敗，請稍後再試'
    statusType.value = 'error'
  }
}

function resetSettings() {
  Object.assign(settings, defaultSettings)
  localStorage.removeItem(storageKey)
  statusMessage.value = '已還原為預設設定'
  statusType.value = 'success'
}

function goBack() {
  router.back()
}
</script>

<style scoped>
.settings-page {
  display: grid;
  gap: 1.5rem;
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
  box-sizing: border-box;
}

.settings-header {
  display: grid;
  gap: 1rem;
}

.eyebrow {
  margin: 0 0 0.35rem;
  color: #856404;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.settings-header h1 {
  margin: 0;
  font-size: 2rem;
  color: var(--color-heading);
}

.subtitle {
  margin: 0.5rem 0 0;
  color: var(--color-text);
}

.settings-card {
  display: grid;
  gap: 1rem;
  padding: 1.5rem;
  border: 1px solid #d6d3d1;
  border-radius: 18px;
  background: linear-gradient(180deg, #fffef7 0%, #f5f5f4 100%);
  box-shadow: 0 18px 45px rgba(28, 25, 23, 0.08);
}

.field {
  display: grid;
  gap: 0.45rem;
}

.field span,
.toggle-title {
  font-weight: 600;
  color: #111827;
}

.field input,
.field select {
  width: 100%;
  padding: 0.75rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  background: #fff;
  font: inherit;
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
}

.toggle-copy {
  margin: 0.25rem 0 0;
  color: var(--color-text);
  font-size: 0.95rem;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

button {
  border: 0;
  border-radius: 999px;
  padding: 0.75rem 1.2rem;
  background: #1f2937;
  color: #fff;
  font: inherit;
  cursor: pointer;
}

.back-button,
.secondary-button {
  background: #e7e5e4;
  color: #111827;
}

.status {
  margin: 0;
  min-height: 1.5rem;
  color: #6b7280;
}

.status.success {
  color: #166534;
}

.status.error {
  color: #b91c1c;
}

@media (max-width: 640px) {
  .settings-page {
    padding: 1rem;
  }

  .toggle-row {
    align-items: flex-start;
  }
}
</style>
