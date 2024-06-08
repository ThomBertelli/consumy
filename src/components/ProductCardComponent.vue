<script lang="ts" setup>

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});
</script>

<template>

    <div
        class=" cursor-pointer transition-transform duration-400 hover:scale-105 p-card px-4 py-5 flex flex-col justify-between items-center">

        <div class="flex">
            <img :src="product.image_url" alt="Store Image" class=" card-image" />
        </div>

        <div class="flex justify-center items-center">
            <h2 class="font-bold text-black">{{ product.title }}</h2>
            <p>{{ product.price }}</p>
        </div>
    </div>

</template>

<style scoped></style>
