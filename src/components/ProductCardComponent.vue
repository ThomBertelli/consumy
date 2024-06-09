<script lang="ts" setup>
import { ref } from 'vue'

const productQtd = ref(1)

const props = defineProps({
    product: {
        type: Object,
        required: true
    }
});

const addItemToCart = (productId, productName, productPrice,productQuantidy) =>{
    
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    
    let itemIndex = cart.findIndex(item => item.productId === productId);
    
    if (itemIndex > -1) {
        
        cart[itemIndex].productQuantidy += productQuantidy;
    } else {
        
        cart.push({productId, productName, productPrice,productQuantidy });
    }

    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}
</script>

<template>

    <div
        class=" cursor-pointer transition-transform duration-400 hover:scale-105 p-card px-4 py-5 flex flex-col justify-between items-center gap-5">

        <div class="flex">
            <img :src="product.image_url" alt="Store Image" class=" product-image" />
        </div>

        <div class="flex flex-col justify-center items-center">
            <h2 class="font-bold text-black text-xl">{{ product.title }}</h2>
            <p>{{ product.price }}</p>
        </div>
        <div class="card flex gap-3 p-fluid  ">
            <InputNumber  v-model="productQtd" buttonLayout="horizontal" showButtons
                :min="1" :max="99">
                <template #incrementbuttonicon>
                    <span class="pi pi-plus text-black" />
                </template>
                <template #decrementbuttonicon>
                    <span class="pi pi-minus text-black" />
                </template>

            </InputNumber>
            <ButtonPrime @click="addItemToCart(product.id, product.title,product.price,productQtd)" class="text-black justify-center">Adicionar</ButtonPrime>
        </div>

    </div>

</template>

<style scoped>
.product-image {
    height: 200px;
}
</style>
