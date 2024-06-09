<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { ref, onMounted, watch, computed } from "vue";
import { useCartStore } from '../stores/cart'

const props = defineProps({
    visible: Boolean
});


const emit = defineEmits(['update:visible']);

const visible = ref(props.visible);
watch(() => props.visible, (newVal) => {
    visible.value = newVal;
});

const cartStore = useCartStore();



const cartItems = ref(cartStore.cart);
console.log(cartItems.value)

watch(cartStore.cart, (newCart) => {
    cartItems.value = newCart;
    console.log(cartItems.value)
    
});

const total = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + parseFloat(item.price.replace("R$","").replace(",",'.')) * item.quantity, 0);
});




</script>

<template>
    <Sidebar class="p-sidebar" position="right" v-model:visible="visible" header="Sacola">

        <div v-for="item in cartItems" :key="item.id">
            <p>{{ item.quantity }} x {{ item.title }}  {{ item.price }} un </p>  
        </div>
        <h3>Total=R$ {{ total }} </h3>
        <ButtonPrime class="text-black font-bold">Ckeckout</ButtonPrime>
    </Sidebar>
</template>

<style lang="css" scoped></style>
