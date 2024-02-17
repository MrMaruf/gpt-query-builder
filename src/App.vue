<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const { isSignedIn, checkAuthCookies } = authStore;
onMounted(() => {
  checkAuthCookies()
})
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
}
nav > a {
  margin: 5px;
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
</style>
