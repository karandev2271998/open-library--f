<template>
  <Form :name="'forget_password'"></Form>
</template>

<script setup>
import Form from "./AuthForm.vue"
import {onMounted} from 'vue';
import {useRoute} from 'vue-router';
const route = useRoute();
onMounted(() => {
  document.title = "Forget Password";
})
</script>