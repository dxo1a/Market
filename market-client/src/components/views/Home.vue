<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { loginUser, logoutUser } from '@/utils/auth-client'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import FormCard from '../ui/Card/FormCard.vue'
import { LoginRequest } from '@/proto/auth'

// onMounted(() => {
//   const token = localStorage.getItem('authToken')
//   if (token) {
//     const decodedToken = decodeToken(token)
//     userName.value = decodedToken.sub
//   }
// })

const userData = reactive<LoginRequest>({
  email: '',
  password: '',
  username: ''
})

async function onSubmit(event: SubmitEvent) {
  const data = await loginUser(userData);
  if (data.status == 'error') { console.log('doing something for handle error') }
}

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
</script>
<template>
  <FormCard @submit="onSubmit">
    <template #header>
      <h1 class="text-xl leading-xl font-medium">Вход</h1>
    </template>
    <template #default>
      <Input v-model="userData.username" name="login" type="text" autocomplete="email username"
        placeholder="Email или имя пользователя" />
      <Input v-model="userData.password" name="password" type="password" autocomplete="password" placeholder="Пароль" />
      <Button class="w-fit m-auto" type="submit">Войти</button>
    </template>
    <template #footer>
      <div class="relative  py-5">
        <hr>
        <span class="text-primary text-md absolute inset-0 m-auto px-4 block bg-card w-fit h-fit">или</span>
      </div>
      <Button :as="RouterLink" type="button" class="w-fit m-auto" :variant="'outlined'">
        Зарегистрируйтесь
      </Button>
    </template>
  </FormCard>
</template>

<style scoped></style>
