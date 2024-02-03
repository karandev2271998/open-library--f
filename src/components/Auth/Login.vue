<template>
  <Form :name="'login'"></Form>
</template>

<script setup>
import {onMounted} from 'vue';
import Form from "./AuthForm.vue";
onMounted(() => {
  document.title = "Login";
})
</script>
