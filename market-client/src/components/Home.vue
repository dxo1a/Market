<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { logoutUser } from '@/utils/auth-client'

const userName = ref('')

const router = useRouter()
onMounted(() => {
  const token = localStorage.getItem('authToken')
  if (token) {
    const decodedToken = decodeToken(token)
    userName.value = decodedToken.sub
  }
})

function decodeToken(token: string) {
  const tokenParts = token.split('.')
  if (tokenParts.length === 3) {
    const base64Url = tokenParts[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const decodedPayload = atob(base64)
    return JSON.parse(decodedPayload)
  }
  return {}
}
const handleLogout = async () => {
  const token = localStorage.getItem('authToken')
  if (token) {
    await logoutUser(token)
    localStorage.removeItem('authToken')
    userName.value = ''
    router.push({ name: 'home' })
  }
}
</script>
<template>
  <div class="form-container">
    <p v-if="userName">Асалам алейкум, {{ userName }}!</p>
    <p v-else>Кто ты брат</p>
    <button v-if="userName" @click="handleLogout">Выйти</button>
    <div v-else>
      <router-link to="/login">
        <button>Войти</button>
      </router-link>
      <router-link to="/register">
        <button>Регистрация</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

input {
  width: 90%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  margin: 0 10px 0 10px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.back-button-container {
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
}

.back-button {
  padding: 8px 16px;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.back-button:hover {
  background-color: #e0e0e0;
}
</style>
