<script setup lang="ts">
import { useQueryStore } from '@/stores/query';
import { storeToRefs } from 'pinia';
import VariableInput from './VariableInput.vue';
import CopyToClipboard from '../CopyToClipboard.vue';
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import type { QuerySettings } from '@/models/queries/Settings';
import router from '@/router';
const route = useRoute();
let queryName = route.params.queryName as string;
let newVariableName = '';
const queryStore = useQueryStore();
const userStore = useUserStore();
const { retrieveQuerySettings, saveQuerySettings, deleteQuerySettings } = userStore;
const { setVariable, setup } = queryStore;
onBeforeMount(async () => {
  const querySettings = await retrieveQuerySettings(queryName);
  setup(querySettings);
});
const { queryBaseState, queryVariablesState, fullQuery } = storeToRefs(queryStore);
const onCreate = () => {
  const newVariable = newVariableName;
  newVariableName = '';
  setVariable(newVariable, '');
};
const onSaveQuery = async (): Promise<void> => {
  const querySettings: QuerySettings = {
    queryName,
    queryBase: queryBaseState.value,
    queryVariables: queryVariablesState.value,
  };
  await saveQuerySettings(queryName, querySettings);
};
const onDuplicateQuery = async (): Promise<void> => {
  let newQueryName = prompt('What name should a duplicate query have?', queryName);
  if (newQueryName) {
    const querySettings: QuerySettings = {
      queryName: newQueryName,
      queryBase: queryBaseState.value,
      queryVariables: queryVariablesState.value,
    };
    await saveQuerySettings(newQueryName, querySettings);
    await router.push(`/queries`);
  }
};
const onDeleteQuery = async (): Promise<void> => {
  if (confirm('Are you sure that you want to delete this query?')) {
    await deleteQuerySettings(queryName);
    await router.push(`/queries`);
  }
};
</script>

<template>
  <div class="container">
    <h1>Query editor for "{{ route.params.queryName }}"</h1>
    <div class="query-controls">
      <button @click.prevent="onSaveQuery">Save query</button>
      <button @click.prevent="onDuplicateQuery">Duplicate query</button>
      <button @click.prevent="onDeleteQuery">Delete query</button>
    </div>
    <div>
      <textarea id="queryBase" v-model="queryBaseState"> </textarea>
    </div>

    <div>
      <h2>Create new Variable</h2>
      <div class="controls">
        <input v-model="newVariableName" type="text" />
        <button @click.prevent="onCreate">Create</button>
      </div>
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
      <textarea class="query" :value="fullQuery" disabled></textarea>
    </div>
  </div>
</template>

<style scoped>
.query-controls > button{
  margin-right: 10px;
}
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
  min-width: 70%;
  /* width: 500px; */
}
.controls {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
}
.controls > button {
  width: fit-content;
  flex-basis: 10%;
  margin-top: 5px;
}
.query {
  background-color: gray;
  border: solid 1px black;
  border-radius: 20px;
  border-bottom-right-radius: 0;
  padding: 15px;
  width: fit-content;
  margin: 15px 0;
  color: white;
}
.query:disabled {
  opacity: 1;
}
</style>
