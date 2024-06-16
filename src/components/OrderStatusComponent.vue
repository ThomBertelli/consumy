<script lang="ts" setup>

import { ref, onMounted, computed } from 'vue'
import { RouterLink } from 'vue-router'
const apiCredential = import.meta.env.VITE_API_CREDENTIAL
const apiUrl = import.meta.env.VITE_API_URL;
const orderState = ref()

const props = defineProps({
    orderId: String
});

const fetchOrder = async () => {
    try {
        const response = await fetch(`${apiUrl}/orders/${props.orderId}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": `${apiCredential}`,
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }

        )
        if (!response.ok) {
            throw new Error('Erro ao buscar pedido')
        }
        const data = await response.json()
        orderState.value = data.state

    } catch (error) {
        console.error('Erro ao buscar pedido:', error)
    }
}

console.log(orderState)

onMounted(() => {
    fetchOrder()
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


        <RouterLink :to="{ name: 'stores' }">
            <ButtonPrime class="text-black font-bold">
                Continuar Comprando
            </ButtonPrime>
        </RouterLink>



    </div>
</template>

<style lang="css" scoped></style>
