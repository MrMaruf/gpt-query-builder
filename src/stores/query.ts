import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { QueryVariables } from '@/models/queries/Variables';

export const useQueryStore = defineStore('query', () => {
  const queryBaseState = ref<string>('Example query base.');
  const queryVariablesState = ref<QueryVariables>({});

  const fullQuery = computed<string>(() => {
    const queryVariables = queryVariablesState.value;
    let query = queryBaseState.value;

    for (const variableName in queryVariables) {
      const variable = queryVariables[variableName];
      const variableAnchor = getVariableAnchor(variableName);
      if (query.includes(variableAnchor)) {
        query = query.replace(variableAnchor, variable.value);
      }
    }
    return query;
  });

  function setQueryBase(newBase: string) {
    queryBaseState.value = newBase;
  }

  function setVariable(name: string, value: string = '') {
    const queryVariables = queryVariablesState.value;
    queryVariables[name] = { name, value };
    queryVariablesState.value = { ...queryVariables };
  }

  function getVariableAnchor(name: string) {
    return '${' + name + '}';
  }

  return {
    queryBaseState,
    queryVariablesState,
    fullQuery,
    setQueryBase,
    setVariable,
    getVariableAnchor,
  };
});
