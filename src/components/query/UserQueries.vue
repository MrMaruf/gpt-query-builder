<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { onBeforeMount } from 'vue';
let newQueryName = '';
const userStore = useUserStore();
const { userQueries } = storeToRefs(userStore);
const { saveQuerySettings, loadSavedQuerySettings, getUser } = userStore;
const user = getUser();

onBeforeMount(async () => {
  await loadSavedQuerySettings();
});

const onCreate = () => {
  const newQuery = newQueryName;
  newQueryName = '';
  saveQuerySettings(newQuery, {
    queryBase: 'Example query base. ${exampleVariable}',
    queryName: newQuery,
    queryVariables: {
      exampleVariable: {
        name: 'exampleVariable',
        value: 'Hello world!!!!',
      },
    },
  });
};
</script>

<template>
  <div class="container">
    <h1>Query Selector for user {{ user }}</h1>
    <div>
      <h2>Create new Query</h2>
      <input v-model="newQueryName" type="text" />
      <button @click.prevent="onCreate">Create</button>
    </div>
    <div>
      <ul>
        <li v-for="variable in userQueries" :key="variable.queryName">
          <a :href="`queries/${variable.queryName}`">
            Edit query <span class="queryName"> "{{ variable.queryName }}" </span>
          </a>
        </li>
      </ul>
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
.queryName {
  font-weight: bold;
}
</style>
