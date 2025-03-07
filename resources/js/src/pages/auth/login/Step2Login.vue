<template>
    <div>
        <input type="text" class="input-class-text " placeholder="Enter Password" />

        <div class="flex flex-row justify-between  mt-5">
            <button @click="loginStore.previous"
                class=" border  border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm w-[48%]">
                Previous
            </button>
            <button class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
                Sign In
            </button>
        </div>
    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useLoginStore } from "../../../stores/auth/login-store";

const loginStore = useLoginStore();

onMounted(() => {
    console.log('Render Step 2');
})
</script>
<style scoped></style>