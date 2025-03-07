<script setup lang="ts">
import { computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import EntryLayout from './components/layouts/EntryLayout.vue';

const route = useRoute();

const layout = computed(() => {
  switch (route.meta?.layout) {
    case 'entry': return EntryLayout
    default: return undefined
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
