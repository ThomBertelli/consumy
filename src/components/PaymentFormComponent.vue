<script lang="ts" setup>
import { reactive } from 'vue';
import InputMask from 'primevue/inputmask';


const cardDataForm = reactive({
    cardNumber: '',
    cardName: '',
    cardCVV: '',
    cardExpireDate: ''
});

function handleSubmit() {
    console.log(cardDataForm);

}

</script>

<template>
    <form class="form-layout flex flex-col gap-6 mt-10" @submit.prevent="handleSubmit">
        <h2 class="text-white text-center font-bold">Cartão de Crédito</h2>
        <FloatLabel>
            <InputMask class=" max-h-11 w-full" mask="9999-9999-9999-9999" placeholder="9999-9999-9999-9999"
                v-model="cardDataForm.cardNumber" id="card-umber" required />
            <label for="card-number">Número do cartão</label>
        </FloatLabel>
        <FloatLabel>
            <InputText class=" max-h-11 w-full" v-model="cardDataForm.cardName" type="text" id="card-name" required />
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

</template>

<style lang="css" scoped></style>
