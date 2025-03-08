<template>
    <div>
        <InputError :errors="vStep1$.name.$errors">
            <input v-model="step1Input.name" type="text" class="input-class-text " placeholder="Enter Name" />

        </InputError>

        <InputError :errors="vStep1$.email.$errors">
            <input v-model="step1Input.email" type="text" class="input-class-text " placeholder="Enter Email" />

        </InputError>
        <!-- <input type="text" class="input-class-text " placeholder="Enter Name" /> -->
        <!-- <input type="text" class="input-class-text " placeholder="Enter Email" /> -->
        <button @click="signupStore.moveStep1"
            class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm w-full mt-5">
            Next
        </button>

    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useSignupStore } from "../../../stores/auth/signup-store";

const signupStore = useSignupStore();

const { vStep1$, step1Input } = storeToRefs(signupStore);

onMounted(() => {
    console.log('Render Step 1');
})
</script>
<style scoped></style>