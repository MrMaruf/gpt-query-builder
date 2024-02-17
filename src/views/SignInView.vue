<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

const schema = {
  email: 'required|email',
  password: 'required',
};

const authStore = useAuthStore();
const { signIn } = authStore;

const onSubmitForm = (formData: typeof schema) => {
  console.log(formData);
  const { email, password } = formData;
  try {
    signIn(email, password);
    router.push({ name: 'home' });
  } catch (error: any) {
    alert('Sign in failed! Try different email and password combination.');
  }
};
</script>

<template>
  <Form @submit="onSubmitForm">
    <div class="mb-3">
      <Field type="text" name="email" />
      <ErrorMessage class="error" name="email" />
    </div>
    <div class="mb-3">
      <Field type="password" name="password" />
      <ErrorMessage class="error" name="password" />
    </div>
    <button>Sign in</button>
  </Form>
</template>
<style scoped>
form {
  border: 1px solid;
  border-radius: 25px;
  background-color: var(--color-background-soft);
  box-shadow: 1px 1px 2px gray;
  padding: 20px;
}
.control {
  display: grid;
  grid-template-columns: 10rem 15rem;
  margin-bottom: 1rem;
}
input {
  border-radius: 8px;
  padding: 2px 5px;
}
.error,
.errorsContainer {
  grid-column: span 3;
  color: rgb(202, 18, 18);
}
button {
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  color: var(--color-text);
  border-radius: 15px;
  padding: 10px 15px;
  box-shadow: 3px 3px 6px gray;
  transition:
    all 0.2s ease-in,
    box-shadow 0.1s ease;
  opacity: 0.5;
}
button:hover:not(:disabled) {
  border-color: var(--color-border-hover);
  box-shadow: 1px 1px 2px gray;
  opacity: 1;
}
</style>
