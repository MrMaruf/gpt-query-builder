<script setup lang="ts">
import { ref } from 'vue';
let copiedAlertIsOn = ref(false);
const props = defineProps<{ name: string; toCopy: string }>();
const onCopy = async () => {
  await navigator.clipboard.writeText(props.toCopy);
  copiedAlertIsOn.value = true;
  setTimeout(() => (copiedAlertIsOn.value = false), 2000);
};
</script>

<template>
  <button @click.prevent="onCopy">Copy {{ props.name }} to clipboard</button>
  <span class="copied-alert" :class="{ visible: copiedAlertIsOn }">Copied</span>
</template>

<style scoped>
.copied-alert {
  margin-left: 10px;
  font-weight: bold;
  color: green;
  opacity: 0;
  transition: opacity 0.3s ease-out;
}

.copied-alert.visible {
  opacity: 1;
}
</style>
