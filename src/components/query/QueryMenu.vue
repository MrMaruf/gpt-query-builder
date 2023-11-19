<script setup lang="ts">
import { useQueryStore } from '@/stores/query';
import { storeToRefs } from 'pinia';
import VariableInput from './VariableInput.vue';
import CopyToClipboard from '../CopyToClipboard.vue';
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
const route = useRoute();
const queryName = route.params.queryName as string;
let newVariableName = '';
const queryStore = useQueryStore();
const userStore = useUserStore();
const { retrieveQuerySettings } = userStore;
const { setVariable, setup } = queryStore;
onBeforeMount(async () => {
  console.log(route.params);
  const querySettings = await retrieveQuerySettings(queryName);
  console.log(querySettings);
  setup(querySettings);
});
const { queryBaseState, queryVariablesState, fullQuery } = storeToRefs(queryStore);
const onCreate = () => {
  const newVariable = newVariableName;
  newVariableName = '';
  setVariable(newVariable, '');
};
</script>

<template>
  <div class="container">
    <h1>Query editor for "{{ queryName }}"</h1>
    <button></button>
    <div>
      <textarea id="queryBase" v-model="queryBaseState"> </textarea>
    </div>

    <div>
      <h2>Create new Variable</h2>
      <input v-model="newVariableName" type="text" />
      <button @click.prevent="onCreate">Create</button>
    </div>
    <div>
      <VariableInput
        v-for="variable in queryVariablesState"
        :name="variable.name"
        :key="variable.name"
      />
    </div>
    <div>
      <h2>Full Query</h2>
      <CopyToClipboard name="full query" :to-copy="fullQuery" />
      <p class="query">
        {{ fullQuery }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 0 10px;
}
div {
  margin: 15px 0;
}
textarea {
  margin: 5px 0;
  display: block;
  min-height: 200px;
  min-width: 400px;
}
p.query {
  background-color: gray;
  border: solid 1px black;
  border-radius: 20px;
  padding: 15px;
  width: fit-content;
  margin: 15px 0;
  color: white;
}
</style>
