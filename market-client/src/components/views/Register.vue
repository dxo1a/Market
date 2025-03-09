<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { registerUser } from '@/utils/grpc-get-data/auth-client';
import FormCard from '../ui/Card/FormCard.vue';
import { RegisterRequest } from '@/proto/auth';
import Button from '../ui/Button.vue';
import Input from '../ui/Input.vue';
import IconAttention from '../icons/IconAttention.vue';
import router from '@/router';

function useUserForm() {
  // TODO: universalize
  const userData = reactive<RegisterRequest & { repeatPassword: string }>({
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
  });
  const error = ref<string>('');
  function validate() {
    const errorStack = [];
    if (userData.password != userData.repeatPassword) errorStack.push('Пароли не совпадают');
    if (userData.password.length < 8) errorStack.push('Пароль должен содержать минимум 8 символов');
    if (userData.username.length < 4) errorStack.push('Имя пользователя должно содержать минимум 4 символа');
    return errorStack
  }
  async function onSubmit() {
    if (validate().length > 0) {
      error.value = validate().join(', ')
      return
    }

    const data = await registerUser(userData);

    if (data.status == 'error') {
      error.value = data.data;
      return;
    } else error.value = ''
    router.push('/login?loginAfterRegister');
  }
  return {
    userData,
    onSubmit,
    error
  }
}
const { userData, onSubmit, error } = useUserForm()
</script>
<template>
  <FormCard @submit="onSubmit">
    <template #header>
      <h1 class="text-xl leading-xl font-medium">Регистрация</h1>
    </template>
    <template #default>
      <Input v-model="userData.username" name="username" type="text" autocomplete="username"
        placeholder="Имя пользователя" />
      <Input v-model="userData.email" name="email" type="email" autocomplete="email" placeholder="Email" />
      <Input v-model="userData.password" name="password" type="password" autocomplete="password" placeholder="Пароль" />
      <Input v-model="userData.repeatPassword" name="repeatPassword" type="password" placeholder="Повторите пароль" />
      <div v-if="error" class="text-sm text-destructive items-center gap-2 flex justify-center">
        <IconAttention class="text-destructive flex-shrink-0" />
        <span class="first-letter:uppercase">{{ error }}</span>
      </div>
      <Button class="w-fit m-auto" :variant="'primary'" type="submit">Зарегистрироваться</button>
    </template>
    <template #footer>
      <div class="relative  py-5">
        <hr class="border-border" />
        <span class="text-primary text-md absolute inset-0 m-auto px-4 block bg-card w-fit h-fit">или</span>
      </div>
      <Button to="/login" class="w-fit m-auto" :variant="'outlined'">
        Войти
      </Button>
    </template>
  </FormCard>
</template>
<style scoped></style>
