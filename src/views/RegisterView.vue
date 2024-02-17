<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
const schema = {
  username: 'required|min:6',
  email: 'required|email',
  password:
    'required|passwordMinLength:12|passwordMaxLength:100|' +
    'hasDigit|hasLowercase|hasUppercase|hasSymbol|onlyAllowedCharacters|',
  confirmPassword: 'required|passwordsMismatch:@password',
};

const authStore = useAuthStore();
const { register } = authStore;

const onSubmit = async (formData: typeof schema) => {
  console.log(formData);
  const { email, username, password } = formData;
  try {
    await register(email, password, username);
    router.push({ name: 'home' });
  } catch (error: any) {
    if (error instanceof Error) {
      alert('Registration failed! ' + error.message);
    } else {
      alert('Registration failed! Try different email and username.');
    }
  }
};
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <div class="control">
      <label for="username">Username</label>
      <Field name="username" />
      <ErrorMessage class="error" name="username" />
    </div>
    <div class="control">
      <label for="email">Email</label>
      <Field name="email" />
      <ErrorMessage class="error" name="email" />
    </div>
    <div class="control">
      <label for="password">Password:</label>
      <Field name="password" :bails="false" v-slot="{ field, errors }">
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password"
          v-bind="field"
        />
        <ul class="errorsContainer">
          <li class="text-red-600" v-for="error in errors" :key="error">
            {{ error }}
          </li>
        </ul>
      </Field>
    </div>
    <div class="control">
      <label class="inline-block mb-2">Confirm Password</label>
      <Field
        name="confirmPassword"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage class="error" name="confirmPassword" />
    </div>
    <button type="submit">Register</button>
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
