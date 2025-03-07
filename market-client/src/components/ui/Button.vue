<script setup lang="ts">
import { computed, toRefs } from 'vue';

interface IProps {
  variant?: 'primary' | 'secondary' | 'outlined'
}

const props = withDefaults(
  defineProps<IProps>(),
  {
    variant: 'primary'
  }
);

const { variant } = toRefs(props)

const variantClass = computed(() => {
  switch (variant.value) {
    case "primary":
    case "secondary":
      return `bg-${variant.value} hover:bg-${variant.value}/90 text-${variant.value}-foreground`
    case "outlined":
      return 'bg-transparent border-primary border border-solid hover:bg-primary hover:text-primary-foreground'
      break;
    default:
      return '';
      break;
  }
})

</script>
<template>
  <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm
    font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none
    [&_svg]:size-4 [&_svg]:shrink-0 shadow  h-9 px-4 py-2" :class="variantClass">
    <slot />
  </button>
</template>
