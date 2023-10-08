<script setup>
import { getCurrentInstance, onBeforeMount, onMounted } from 'vue';
const {proxy} = getCurrentInstance();

onBeforeMount(()=>{
    localStorage.removeItem('authToken');
})

onMounted(()=>{
    proxy.$router.push("/login");
})
</script>

<template>

</template>
