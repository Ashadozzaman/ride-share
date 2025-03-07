<script setup>
import { onMounted } from "vue"; // ✅ Import onMounted
import { RouterLink } from "vue-router";
import { App } from "../../api/api";
import { useSignupStore } from "../../stores/auth/signup-store";
import Step1 from "./signup/Step1Signup.vue";
import Step2 from "./signup/Step2Signup.vue";
import Step3 from "./signup/Step3Signup.vue";

const signupStore = useSignupStore();

onMounted(() => {
    signupStore.currentStep = Step1;
    signupStore.step1 = Step1;
    signupStore.step2 = Step2;
    signupStore.step3 = Step3;
})

</script>

<template>
    <div class="flex flex-row justify-between mt-40">
        <div></div>
        <div class="lg:w-[400px] md:w-[400px]">
            <h1 class="text-2xl font-semibold">Sign Up</h1>
            <hr class="h-[1px] bg-black w-full mt-1" />

            <!-- <Step1 /> -->
            <KeepAlive>
                <component :is="signupStore.currentStep" />
            </KeepAlive>

            <div class="flex flex-row justify-end">
                <RouterLink to="/login" class="text-indigo-600 mt-1  hover:underline">Already have an
                    account?</RouterLink>
            </div>

            <div class="flex flex-col ">

                <div class="flex flex-row mt-5">
                    <hr class="h-[1px] bg-black w-[48%] mt-3" />
                    <div class="font-semibold">Or</div>
                    <hr class="h-[1px] bg-black w-[48%] mt-3" />
                </div>
                <button
                    class="flex flex-row justify-center items-center gap-2 mt-5 bg-gray-200 py-2 px-2 rounded-md shadow-sm">
                    <img :src="App.baseUrl + '/images/google-logo.svg'" alt="Logo" />
                    <span>Countinue with Google</span>
                </button>
            </div>
        </div>
        <div></div>
    </div>
</template>
