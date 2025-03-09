<template>
    <div>
        <!-- <input
            type="text"
            class="input-class-text"
            placeholder="Enter Password"
        /> -->

        <Loading :loading="loading" />
        <InputError :errors="vStep2$.password.$errors">
            <input
                v-model="step2Input.password"
                type="password"
                class="input-class-text"
                placeholder="Enter Password"
            />
        </InputError>

        <div class="flex flex-row justify-between mt-5">
            <button
                @click="loginStore.previous"
                class="border border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm w-[48%]"
            >
                Previous
            </button>
            <button
                @click="loginStore.signin"
                class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-[48%]"
            >
                Sign In
            </button>
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useLoginStore } from "../../../stores/auth/login-store";

const loginStore = useLoginStore();
const { vStep2$, step2Input, loading } = storeToRefs(loginStore);

onMounted(() => {
    console.log("Render Step 2");
});
</script>
<style scoped></style>
