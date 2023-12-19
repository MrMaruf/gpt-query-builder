<script setup lang="ts">
let password: string = '';
let email: string = '';

const onSubmitForm = (event: Event) => {
  event.preventDefault();
  const formElement = event.currentTarget as HTMLFormElement;
  const form = new FormData(formElement);
  console.log(form);
};
</script>

<template>
  <form @submit="onSubmitForm">
    <div class="mb-3">
      <input type="text" name="email" v-model="email" />
    </div>
    <div class="mb-3">
      <input type="text" name="password" v-model="password" />
    </div>
    <button>Sign in</button>
  </form>
</template>
<style scoped></style>
