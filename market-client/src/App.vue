<script setup lang="ts">
import { computed, watch } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import EntryLayout from './components/layouts/EntryLayout.vue';

const route = useRoute();

const layout = computed(() => {
  switch (route.meta?.layout) {
    case 'entry': return EntryLayout
    default: return undefined
  }
})

watch(() => route.meta.requiresAuth, (value) => {
  if (value) {
    console.log('required auth')
  } else {
    console.log('no required auth')
  }
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
