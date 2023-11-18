<script setup lang="ts">
import { useQueryStore } from '@/stores/query';
import {} from 'pinia';
import CopyToClipboard from '../CopyToClipboard.vue';
const props = defineProps<{ name: string }>();
const { name } = props;
let value = '';
const queryStore = useQueryStore();
const { setVariable, getVariableAnchor } = queryStore;
const onSave = () => {
  setVariable(name, value);
};
</script>

<template>
  <div>
    <h4>Variable name: {{ name }}</h4>
    <CopyToClipboard name="variable anchor" :to-copy="getVariableAnchor(name)" />
    <input :id="name" :name="name" v-model="value" type="text" />
    <button @click.prevent="onSave">Save</button>
  </div>
</template>

<style scoped>
.anchor {
  visibility: hidden;
}
input {
  display: block;
}
</style>
