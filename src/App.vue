<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { onActivated, onMounted, onRenderTriggered } from 'vue';

const authStore = useAuthStore();
const { isSignedIn, checkAuthCookies, signOut } = authStore;
onMounted(() => {
  checkAuthCookies();
});
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <template v-if="isSignedIn()">
          <RouterLink to="/queries">Queries</RouterLink>
          <button @click="signOut">Sign out</button>
        </template>
        <template v-else>
          <RouterLink to="/sign-in">Sign In</RouterLink>
          <RouterLink to="/register">Register</RouterLink>
        </template>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header,
nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 15px;
}
nav > a,
nav > button {
  margin: 5px;
  min-width: 80px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
main {
  margin: 0 25px;
  min-height: 500px;
  width: 80vw;
  max-width: 800px;
}
button {
  border: none;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: all 0.2s ease-in;
  padding: 0;
  opacity: 1;
  cursor: pointer;
  color: var(--color-text-link);
}
button:hover {
  background-color: var(--color-background-link-hover);
}
</style>
