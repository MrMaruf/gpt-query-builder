import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { firestoreDB } from '@/includes/firebase';
import type { QuerySettings } from '@/models/queries/Settings';

/**
 * @key: query name
 * @value: firebase id for query setup
 */
type UserQueries = Record<string, QuerySettings>;
const user = 'MrMaruf';
const collection = 'queries';

export const useQueryStore = defineStore('query', () => {
  for
  const userQueries = ref<UserQueries>({});

  async function setQuerySettings(queryName: string, querySettings: QuerySettings) {
    if (!userQueries.value[queryName]) {
      const uid = buildDBUID(queryName);
      await saveDocument(uid, querySettings);
    }
  }

  function retrieveQuerySettings(queryName: string): QuerySettings {
    return userQueries.value[queryName];
  }

  return { setQuerySettings, retrieveQuerySettings };
});

function buildDBUID(name: string) {
  return `${user}:${name}`;
}

async function saveDocument(name: string, documentToSave: object) {
  const reference = doc(firestoreDB, collection, name);
  await setDoc(reference, documentToSave);
}

async function getDocument(name: string): Promise<QuerySettings> {
  const docRef = doc(firestoreDB, collection, name);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data() as QuerySettings;
    console.log('Document data:', data);
    return data;
  } else {
    console.log('No such document!');
    throw new Error('Document not found.');
  }
}
