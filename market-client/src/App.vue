<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import EntryLayout from './components/layouts/EntryLayout.vue';
import { getCookie } from './utils/cookie';
import router from './router';
import MainLayout from './components/layouts/MainLayout.vue';

const route = useRoute();

const layout = computed(() => {
  switch (route.meta?.layout) {
    case 'entry': return EntryLayout
    case 'main': return MainLayout
    default: return undefined
  }
})

watch(() => route.meta.requiresAuth, (value) => {
  if (!(value && getCookie('auth_token'))) router.push('/login')
})
</script>
<template>
  <component :is="layout">
    <template #default>
      <RouterView />
    </template>
  </component>
</template>

<style></style>
