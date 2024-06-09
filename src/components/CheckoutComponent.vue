<script lang="ts" setup>
import { ref, watch, computed, onMounted } from "vue";
import { useCartStore } from '../stores/cart'
import PaymentForm  from './PaymentFormComponent.vue'


const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const cartStore = useCartStore();
const orderId = ref()
const storeId = cartStore.storeInfo.storeId;




const createOrder = async () => {

    const body = {
        order: {
            store_id: storeId,

        }
    };
    try {
        const response = await fetch(`${apiUrl}/buyers/orders`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        });
        if (response.status === 201) {
            const json = await response.json()
            orderId.value = json.order.id

        } else {
            const errorData = await response.json();
            console.log(errorData)
        }
    } catch (error: any) {
        console.error(error)
    }
}

const createOrderItem = async (productId, quantity, productPrice) => {

    const body = {
        order_item: {
            order_id: orderId.value,
            product_id: productId,
            amount: quantity,
            price: productPrice
        }
    };
    try {
        const response = await fetch(`${apiUrl}/order_items`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        });
        if (response.status === 201) {
            const json = await response.json()
            console.log(json)

        } else {
            const errorData = await response.json();
            console.log(errorData)
        }
    } catch (error: any) {
        console.error(error)
    }
}

const callCreateItems = async () => {
    for (let itemCart of cartStore.cart) {
        console.log(itemCart);
        let priceClearCurrency = itemCart.price.replace("R$", "").replace(",", ".");
        let priceFloat = parseFloat(priceClearCurrency);

        await createOrderItem(itemCart.id, itemCart.quantity, priceFloat);
    }
};


onMounted(() => {
    createOrder();
    setTimeout(() => {
        callCreateItems();
    }, 2000);



    ;
});


</script>

<template>
    <div class="flex flex-col justify-center items-center h-screen w-screen">
        <h1>Checkout</h1>
        <div>
            <h3>Pedido: {{ orderId }}</h3>
            <ul v-for="item in cartStore.cart" :key="item.id">
                <li>{{ item.quantity }} x {{ item.title }} {{ item.price }}</li>

            </ul>
            <h3>Total = R$ {{ cartStore.cartTotal }},00</h3>
        </div>
        <PaymentForm></PaymentForm>
       
    </div>
</template>

<style scoped>
.form-layout {
    background-color: rgb(5, 5, 5);
    padding: 50px 100px;
    border-radius: 25px;
    max-width: 30em;
}
</style>
