<template>
    <div>
        <input type="text" class="input-class-text " placeholder="Enter Email" />
        <button @click="loginStore.next" class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-full mt-5">
            Next
        </button>

    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useLoginStore } from "../../../stores/auth/login-store";

const loginStore = useLoginStore();

onMounted(() => {
    console.log('Render Step 1');
})
</script>
<style scoped></style>