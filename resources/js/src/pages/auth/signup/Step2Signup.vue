<template>
    <div>
        <Loading :loading="loading" />
        <InputError :errors="vStep2$.password.$errors">
            <input v-model="step2Input.password" type="password" class="input-class-text "
                placeholder="Enter Password" />

        </InputError>
        <!-- <input type="text" class="input-class-text " placeholder="Enter Password" /> -->

        <div class="flex flex-row justify-between  mt-5">
            <button @click="signupStore.backStep2"
                class=" border  border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm w-[48%]">
                Previous
            </button>
            <button @click="signupStore.moveStep2"
                class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-[48%]">
                Next
            </button>
        </div>

    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
// import Loading from "../../../components/base-components/Loading.vue";
import { useSignupStore } from "../../../stores/auth/signup-store";

const signupStore = useSignupStore();
const { vStep2$, step2Input, loading } = storeToRefs(signupStore);

onMounted(() => {
    console.log('Render Step 2');
})
</script>
<style scoped></style>