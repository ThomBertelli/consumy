<script setup lang="ts">
    const message = defineModel('message',{default: "Hello World"})
</script>

<template>
    <div>

        <h1>Meu primeiro componente</h1> 
    
        <div>Dizendo olá, para variar: {{ message }}</div>

        <input v-model="message">

    </div>

</template>
