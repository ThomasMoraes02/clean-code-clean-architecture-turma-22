<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  document: '',
  password: '',
  accountId: '',
  message: '',
});

async function signup() {
  const input = form.value;
  const response = await fetch("http://localhost:3000/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  const output = await response.json();
  if (output.accountId) {
    form.value.accountId = output.accountId;
    form.value.message = "success";
  } else {
    form.value.message = output.message;
  }
}

</script>

<template>
  <div>
    <h1>branas.io</h1>
    <div class="signup-form">
        <input type="text" class="input-name" v-model="form.name" placeholder="Name">
        <input type="email" class="input-email" v-model="form.email" placeholder="Email">
        <input type="text" class="input-document" v-model="form.document" placeholder="Document">
        <input type="password" class="input-password" v-model="form.password" placeholder="Password">
        <button class="button-signup" @click="signup">Signup</button>
        <span class="span-account-id">{{ form.accountId }}</span>
        <span class="span-message">{{ form.message }}</span>
    </div>
  </div>
</template>

<style scoped>
.signup-form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
}
.input-name,
.input-email,
.input-document,
.input-password {
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
}
.button-signup {
    padding: 10px;
    font-size: 16px;    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}
.button-signup:hover {
    background-color: #0056b3;
}
.span-message {
    margin-top: 10px;
    font-size: 14px;
    color: red;
}
</style>
