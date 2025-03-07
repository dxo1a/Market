<script setup lang="ts">
import Card from './Card.vue';
defineEmits(['submit']);
</script>

<template>
  <Card>
    <div class="flex flex-col gap-4 text-center">
      <slot name="header" />
      <form class="flex flex-col gap-3" @submit.prevent="$emit('submit', $event)">
        <slot />
      </form>
      <slot name="footer" />
    </div>
  </Card>
</template>
