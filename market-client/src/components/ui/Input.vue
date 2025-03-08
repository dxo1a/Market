<script setup lang="ts">
const model = defineModel<string | number>({
  required: false,
  default: '',
});
</script>
<template>
  <input v-model="model" class="flex leading-lg shrink-0 w-full rounded-md border border-input border-solid bg-transparent px-4 py-3 text-base
    shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground
    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1" />
</template>
