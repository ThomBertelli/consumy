<script lang="ts" setup>

import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const orderState = ref()
import { fetchEventSource } from '@microsoft/fetch-event-source';

const props = defineProps({
    orderId: String
});

// const fetchOrder = async () => {
//     try {
//         const response = await fetch(`${apiUrl}/orders/${props.orderId}`, {
//             headers: {
//                 "Accept": "application/json",
//                 "Content-Type": "application/json",
//                 "X-API-KEY": `${apiCredential}`,
//                 "Authorization": `Bearer ${localStorage.getItem("token")}`
//             }
//         }

//         )
//         if (!response.ok) {
//             throw new Error('Erro ao buscar pedido')
//         }
//         const data = await response.json()
//         orderState.value = data.state

//     } catch (error) {
//         console.error('Erro ao buscar pedido:', error)
//     }
// }

let controller;

const openSSE = async () => {
    console.log('vai')
    let id = props.orderId
    let url = `${apiUrl}/orders/${id}/watch`;

    controller = new AbortController();
    const signal = controller.signal;

    fetchEventSource(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'X-API-KEY': apiCredential,
        },
        signal: signal,
        async onopen(response) {
            if (response.ok) {
                console.log('connected!');
                return; // everything's good
            }
        },
        onmessage(msg) {
            if (msg.event === 'order-paid') {
                orderState.value = 'paid'
                
            } 
            if (msg.event === 'order-not-paid') {
                orderState.value = 'notPaid'
                
            }
        }


    });

}




console.log(orderState)

onMounted(() => {
    openSSE()
});





</script>

<template>
    <div class="flex flex-col gap-5 justify-center items-center h-screen w-screen">
        <h1>Status do Pedido <strong>{{ props.orderId }}</strong></h1>
        <div v-if="orderState == 'paid'" class="flex flex-col gap-2 items-center">
            <i class="pi pi-check-circle text-8xl text-green-500"></i>
            <p>Pedido realizado com sucesso!</p>
            <p>Muito obrigado!</p>
        </div>

        <div v-if="orderState == 'notPaid'" class="flex flex-col gap-2 items-center">
            <i class="pi pi-times-circle text-8xl text-red-500"></i>
            <p>Falha no pagamento!</p>
            
        </div>
        
        <p v-if="orderState != 'paid' && orderState != 'notPaid'" >Estamos processando seu pagamento...</p>
        

        <RouterLink :to="{ name: 'stores' }">
            <ButtonPrime class="text-black font-bold">
                Continuar Comprando
            </ButtonPrime>
        </RouterLink>


    </div>
</template>

<style lang="css" scoped></style>
