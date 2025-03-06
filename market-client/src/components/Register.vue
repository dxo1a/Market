<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from '@/utils/auth-client';

const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();

const passwordsMatch = computed(() => password.value === confirmPassword.value);
const isFormValid = computed(() => email.value && username.value.length >= 5 && password.value && passwordsMatch.value);

const handleRegister = async () => {
  if (isFormValid.value) {
    const token = await registerUser(email.value, username.value, password.value);
    if (token) {
      localStorage.setItem('authToken', token);
      router.push({ name: 'home' });
    }
  } else {
    console.error('Form is invalid!');
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

    <h1>Регистрация</h1>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="username" type="text" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <input v-model="confirmPassword" type="password" placeholder="Подтвердите пароль" required />
      <button type="submit" :disabled="!isFormValid">Зарегистрироваться</button>
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
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
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

button:disabled {
  background-color: #4caf4f46;
  color: #ffffff34;
  cursor: default;
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
