<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { loginUser } from '@/utils/auth-client';

const emailOrUsername = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  const token = await loginUser(emailOrUsername.value, '', password.value);
  if (token) {
    localStorage.setItem('authToken', token);
    router.push({ name: 'home' });
  } else {
    console.error('Login failed!');
  }
};
</script>
<template>
  <div class="form-container">
    <div class="back-button-container">
      <router-link to="/">
        <button class="back-button">Назад</button>
      </router-link>
    </div>

    <h1>Вход</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="emailOrUsername" type="text" placeholder="Email или имя пользователя" />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
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
  padding: 10px 20px;
  background-color: #4CAF50;
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
