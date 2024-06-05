<script lang="ts" setup>
    import { ref, onMounted } from 'vue';
    import StoreCard from './StoreCardComponent.vue';
    const stores = ref([]);

    onMounted(async () => {
    const response = await fetch('URL_DA_SUA_API');
    const data = await response.json();
    stores.value = data;
    });
</script>

<template>
    <div>
        <StoreCard v-for="store in stores" :key="store.id" :store="store" />
    </div>
</template>

<style lang="css" scoped>
    
</style>
