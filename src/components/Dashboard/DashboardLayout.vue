<template>
  <DashboardNavbar />
  <div>
    <router-view></router-view>
  </div>
</template>


<script setup>
import DashboardNavbar from "./DashboardNavbar.vue";
</script>