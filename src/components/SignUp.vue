<script lang="ts" setup>

import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const router = useRouter()
const awaiting = ref(false)
const email = defineModel<string>('email')
const password = defineModel<string>('password')
const confirmPassword = defineModel<string>('confirmPassword')
const passwordMatch = ref(false)
const authStore = useAuthStore();

watch([password, confirmPassword], () => {
    passwordMatch.value = password.value === confirmPassword.value;
});


const showSuccessToast = () => {
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Cadastro realizado!', life: 3000 });
}

const showErrorToast = (errorMessage: string) => {
    toast.add({ severity: 'error', summary: 'Erro', detail: errorMessage, life: 3000 });
}

const onSubmit = async () => {
    try {
        await authStore.signUp(email.value || '', password.value || '',  () => {
            showSuccessToast();
            setTimeout(() => {
                router.push('/signin')
            }, 3005)
        }, () => {
            showErrorToast('Email já cadastrados!');
        });
    } catch (error:any) {
        showErrorToast(error.message);
    }
};

</script>

<template>
    <div class=" backimage flex flex-col justify-center items-center h-screen">
        
        <form class=" form-layout flex flex-col gap-8 mt-10  " @submit.prevent="onSubmit">
            <h1 class="text-white text-center">Faça seu <strong>Cadastro</strong></h1>

            <FloatLabel>
                <InputText class="w-full max-h-11" size="small" v-model="email" type="email" id="email" required />
                <label for="email">E-mail</label>
            </FloatLabel>


            <FloatLabel>
                <PasswordInput 
                    class="w-full max-h-11" 
                    v-model="password" 
                    inputId="password" 
                    toggleMask
                    :feedback="true"
                    required promptLabel="Escolha sua senha" 
                    weakLabel="Ruim" 
                    mediumLabel="Boa" 
                    strongLabel="Ótima"
                >

                    <template #footer>
                        
                        <p>Sugestões:</p>
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                            <li>No mínimo 6 caractéres</li>
                            <li>Pelo menos um número</li>
                            <li>Pelo menos uma letra maiúscula</li>
                            <li>Pelo menos uma letra minúscula</li>
                        </ul>
                    </template>
                </PasswordInput>
                <label for="password">Senha</label>
            </FloatLabel>

            <FloatLabel>
                <PasswordInput 
                    class="w-full max-h-11" 
                    v-model="confirmPassword" 
                    inputId="confirm-password"
                    toggleMask 
                    required 
                    :feedback="false"
                >
                
                </PasswordInput>
                <label for="confirm-password">Confirmar Senha</label>
                <small id="confirm-password-help" class="block mt-1 text-red-500 text-sm" v-if="confirmPassword && !passwordMatch">
                Deve coincidir com a senha
                </small>
            </FloatLabel>
            
            <ToastPrime class="bg-white" />

            <ButtonPrime class="text-black" :disabled="!passwordMatch" type="submit" label="Cadastrar" v-show="!awaiting" />
        </form>
    </div>
</template>

<style scoped>

.backimage {
    background-image: url('../assets/images/background_signin.png');
    background-size: cover;
}

.form-layout {
    background-color: rgb(5, 5, 5);
    padding: 50px 100px;
    border-radius: 25px;
}
</style>