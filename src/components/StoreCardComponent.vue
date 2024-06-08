<script lang="ts" setup>
import { RouterLink } from 'vue-router';

const props = defineProps({
    store: {
        type: Object,
        required: true
    }
});
</script>

<template>
    <RouterLink :to="{name: 'store-products', params:{storeId: store.id}, state:{store}}">

        <div class=" cursor-pointer transition-transform duration-400 hover:scale-105 p-card px-4 py-5 flex justify-between items-center">
    
            <div class="flex-1">
                <img :src="store.logo_url" alt="Store Image" class=" card-image" />
            </div>
    
            <div class="flex-1 justify-center items-center">
                <h2 class="font-bold text-black">{{ store.name }}</h2>
            </div>
        </div>

    </RouterLink>
</template>

<style scoped>

.card-image{
    max-width: 5em;
}



</style>
