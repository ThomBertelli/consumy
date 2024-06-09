
<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import CartSidebarComponent from './components/CartSidebarComponent.vue'
import { ref } from 'vue';

const isSidebarVisible = ref(false);

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};

</script>

<template>

  <div >
    <HeaderComponent @toggle-sidebar="toggleSidebar" ></HeaderComponent>
    <CartSidebarComponent :visible="isSidebarVisible" @update:visible="isSidebarVisible = $event"></CartSidebarComponent>
    <div >
      <RouterView/>
    </div>
  </div>
</template>

