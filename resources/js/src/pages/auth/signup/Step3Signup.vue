<template>
    <div>
        <input type="text" class="input-class-text " placeholder="Enter Code" />

        <div class="flex flex-row justify-between  mt-5">
            <button @click="signupStore.backStep3"
                class=" border  border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm w-[48%]">
                Previous
            </button>
            <button class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
                Sign Up
            </button>
        </div>

    </div>
</template>
<script setup>
import { onMounted } from "vue";
import { useSignupStore } from "../../../stores/auth/signup-store";

const signupStore = useSignupStore();

onMounted(() => {
    console.log('Render Step 3');
})
</script>
<style scoped></style>