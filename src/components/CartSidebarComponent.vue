<script lang="ts" setup>
import Sidebar from 'primevue/sidebar';
import { ref, watch, computed } from "vue";
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
const total = computed(() => cartStore.cartTotal);
const cartItems = computed(() => cartStore.cart);

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
