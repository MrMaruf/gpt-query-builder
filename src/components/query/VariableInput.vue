<script setup lang="ts">
import { useQueryStore } from '@/stores/query';
import {} from 'pinia';
import CopyToClipboard from '../CopyToClipboard.vue';
const props = defineProps<{ name: string }>();
const { name } = props;
let value = '';
const queryStore = useQueryStore();
const { setVariable, deleteVariable, getVariableAnchor } = queryStore;
const onSave = () => {
  setVariable(name, value);
};
const onDelete = () => {
  if (window.confirm("Are you sure you want to delete this variable?")) {
    deleteVariable(name);
  }
};
</script>

<template>
  <div>
    <h4>Variable name: {{ name }}</h4>
    <CopyToClipboard name="variable anchor" :to-copy="getVariableAnchor(name)" />
    <textarea :id="name" :name="name" v-model="value" type="text" />
    <div class="controls">
      <button @click.prevent="onSave">Save</button>
      <button @click.prevent="onDelete">Delete</button>
    </div>
  </div>
</template>

<style scoped>
textarea {
  margin: 5px 0;
  display: block;
  min-height: 100px;
  min-width: 400px;
}
.anchor {
  visibility: hidden;
}
input {
  display: block;
}
.controls {
  display: flex;
  flex-direction: row;
}
</style>
