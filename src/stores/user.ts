import { ref } from 'vue';
import { defineStore } from 'pinia';
import { doc, setDoc, getDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { firestoreDB } from '@/includes/firebase';
import type { QuerySettings } from '@/models/queries/Settings';

/**
 * @key: query name
 * @value: firebase id for query setup
 */
type UserQueries = Record<string, QuerySettings>;
const user = 'MrMaruf';
const userCollectionName = 'users';
const queryCollectionName = 'queries';

export const useUserStore = defineStore('user', () => {
  const userQueries = ref<UserQueries>({});
  const userQueriesAreLoaded = ref<boolean>(false);

  async function loadSavedQuerySettings() {
    const subCollection = collection(firestoreDB, userCollectionName, user, queryCollectionName);
    const querySnapshot = await getDocs(subCollection);
    const allData: UserQueries = {};
    querySnapshot.forEach((doc) => {
      if (doc.exists()) {
        const data = doc.data() as QuerySettings;
        allData[data.queryName] = data;
      }
    });
    userQueries.value = { ...allData };
    userQueriesAreLoaded.value = true;
  }

  async function saveQuerySettings(queryName: string, querySettings: QuerySettings): Promise<void> {
    const collection = buildSubCollectionPath(queryName);
    await saveDocument(collection, querySettings);
    userQueries.value = { ...userQueries.value, queryName: querySettings };
  }

  async function deleteQuerySettings(queryName: string): Promise<void> {
    const collection = buildSubCollectionPath(queryName);
    await deleteDocument(collection);
  }

  async function retrieveQuerySettings(queryName: string): Promise<QuerySettings> {
    if (userQueriesAreLoaded.value) return userQueries.value[queryName];
    const collection = buildSubCollectionPath(queryName);
    return await getDocument(collection);
  }

  return {
    userQueries,
    saveQuerySettings,
    deleteQuerySettings,
    retrieveQuerySettings,
    loadSavedQuerySettings,
  };
});

function buildSubCollectionPath(name: string): string[] {
  return [user, queryCollectionName, name];
}

async function saveDocument(subCollectionPath: string[], documentToSave: object) {
  const reference = doc(firestoreDB, userCollectionName, ...subCollectionPath);
  await setDoc(reference, documentToSave);
}

async function deleteDocument(subCollectionPath: string[]) {
  const reference = doc(firestoreDB, userCollectionName, ...subCollectionPath);
  await deleteDoc(reference);
}

async function getDocument(subCollectionPath: string[]): Promise<QuerySettings> {
  const docRef = doc(firestoreDB, userCollectionName, ...subCollectionPath);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data = docSnap.data() as QuerySettings;
    return data;
  } else {
    throw new Error('Document not found.');
  }
}
