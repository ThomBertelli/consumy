<script lang="ts" setup>
import { ref, reactive, watch } from "vue";
import { useCartStore } from '../stores/cart'
import InputMask from 'primevue/inputmask';
import { useRouter } from 'vue-router';


const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const cartStore = useCartStore();
const orderId = ref()
const storeId = cartStore.storeInfo.storeId;
const router = useRouter();


const cardDataForm = reactive({
    cardNumber: '',
    cardName: '',
    cardCVV: '',
    cardExpireDate: ''
});

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
            callCreateItems()
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
            pay(orderId.value)

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

const endOrder = ()=>{
    localStorage.setItem('cart',"")
    router.push({ name: 'order', params: { orderId: `${orderId.value}` } });
}

const pay = async (id) => {

    const body = {

        value: parseFloat(cartStore.cartTotal.toString()), // Ensure cartTotal is a float
        number: cardDataForm.cardNumber, // Updated parameter name
        valid: cardDataForm.cardExpireDate,
        cvv: parseInt(cardDataForm.cardCVV) // Updated parameter name
    };

    try {
        const response = await fetch(`${apiUrl}/orders/${id}/pay`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(body)
        });
        if (response.status === 200) {
            const json = await response.json()
            endOrder()
        } else {
            const errorData = await response.json();
            console.log(errorData)
            endOrder()
        }
    } catch (error: any) {
        console.error(error)
    }


}



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
        <form class="form-layout flex flex-col gap-6 mt-10" @submit.prevent="createOrder()">
            <h2 class="text-white text-center font-bold">Cartão de Crédito</h2>
            <FloatLabel>
                <InputMask class=" max-h-11 w-full" mask="9999 9999 9999 9999" placeholder="9999 9999 9999 9999"
                    v-model="cardDataForm.cardNumber" id="card-umber" required />
                <label for="card-number">Número do cartão</label>
            </FloatLabel>
            <FloatLabel>
                <InputText class=" max-h-11 w-full" v-model="cardDataForm.cardName" type="text" id="card-name"
                    required />
                <label for="card-name">Nome impresso no cartão </label>
            </FloatLabel>
            <div class="flex gap-4 space-x-2">
                <FloatLabel class="w-1/2">
                    <InputText class="w-full max-h-11 " v-model="cardDataForm.cardCVV" type="text" id="cvv" required
                        maxlength="3" />
                    <label for="cvv">CVV</label>
                </FloatLabel>
                <FloatLabel class="w-1/2">
                    <InputMask class="w-full max-h-11" placeholder="99/99" mask="99/99" slotChar="mm/aa"
                        v-model="cardDataForm.cardExpireDate" id="card-expire-date" required />
                    <label for="card-expire-date">Validade</label>
                </FloatLabel>
            </div>

            <ButtonPrime type="submit" class=" flex text-black font-bold justify-center">Pagar</ButtonPrime>
        </form>

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
