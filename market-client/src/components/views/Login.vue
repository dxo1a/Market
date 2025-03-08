<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { loginUser } from '@/utils/auth-client'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import FormCard from '../ui/Card/FormCard.vue'
import { LoginRequest } from '@/proto/auth'
import IconAttention from '../icons/IconAttention.vue'

function useUserForm() {
  const userData = reactive<LoginRequest>({
    password: '',
    emailOrUsername: '',
  });
  const error = ref<string>('');

  async function onSubmit() {
    const data = await loginUser(userData);
    if (data.status == 'error') {
      error.value = data.data;
      return;
    } else error.value = ''
  }
  return {
    error,
    userData,
    onSubmit
  }
}
const { onSubmit, error, userData } = useUserForm()
</script>
<template>
  <FormCard @submit="onSubmit">
    <template #header>
      <h1 class="text-xl leading-xl font-medium">Вход</h1>
    </template>
    <template #default>
      <Input v-model="userData.emailOrUsername" name="login" type="text" autocomplete="email username"
        placeholder="Email или имя пользователя" />
      <Input v-model="userData.password" name="password" type="password" autocomplete="password" placeholder="Пароль" />
      <div v-if="error" class="text-sm text-destructive items-center gap-2 flex justify-center">
        <IconAttention class="text-destructive " />
        <span class="capitalize">{{ error }}</span>
      </div>
      <Button class="w-fit m-auto" :variant="'primary'" type="submit">Войти</button>
    </template>
    <template #footer>
      <div class="relative  py-5">
        <hr class="border-border" />
        <span class="text-primary text-md absolute inset-0 m-auto px-4 block bg-card w-fit h-fit">или</span>
      </div>
      <Button to="/register" :as="RouterLink" type="button" class="w-fit m-auto" :variant="'outlined'">
        Зарегистрируйтесь
      </Button>
    </template>
  </FormCard>
</template>

<style scoped></style>
