<template>
    <div>
        <!-- <input type="text" class="input-class-text " placeholder="Enter Code" /> -->
        <span class="text-gray-600">Code sent to {{ step1Input.email }}</span>
        <Loading :loading="loading" />

        <InputError :errors="vStep3$.otp_code.$errors">
            <input v-model="step3Input.otp_code" type="text" class="input-class-text " placeholder="Enter OTP Code" />

        </InputError>
        <div class="flex flex-row justify-between  mt-5">
            <button @click="signupStore.backStep3"
                class=" border  border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm w-[48%]">
                Previous
            </button>
            <button @click="signupStore.signupUser"
                class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
                Sign Up
            </button>
        </div>

    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useSignupStore } from "../../../stores/auth/signup-store";

const signupStore = useSignupStore();

const { vStep3$, step3Input, step1Input, loading } = storeToRefs(signupStore);

onMounted(() => {
    console.log('Render Step 3');
})
</script>
<style scoped></style>