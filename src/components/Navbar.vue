<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
        <div class="d-flex">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item me-2" v-for="menu in menuItems" :key="menu">
              <router-link :to="{ name: menu.pathName }" :class="menu.class"
                >{{ menu.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const LoginClass = ref("");
const menuItems = reactive([
  {
    name: "Login",
    class: "btn btn-outline-primary rounded-pill ",
    pathName: "login",
  },
  {
    name: "Register",
    class: "btn btn-outline-primary rounded-pill active",
    pathName: "register",
  },
]);
watch(route, (newValue, oldValue) => {
  for (let menu of menuItems) {
    menu.class =
      menu.pathName == newValue.name
        ? "btn btn-outline-info rounded-pill active"
        : "btn btn-outline-info rounded-pill";
  }
});
</script>