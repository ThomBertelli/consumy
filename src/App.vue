
<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
</script>

<template>

  <div >
    <HeaderComponent></HeaderComponent>
    <div >
      <RouterView/>
    </div>
  </div>
</template>

