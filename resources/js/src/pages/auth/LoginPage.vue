<script setup>
import { App } from "../../api/api";
</script>
<template>
    <div class="flex flex-row justify-between mt-40">
        <div></div>
        <div class="w-[400px]">
            <h1 class="text-2xl font-semibold">Sign In</h1>
            <input
                type="text"
                class="rounded-md border py-2 px-2 w-full"
                placeholder="Enter Email"
            />

            <div class="flex flex-col mt-5">
                <button
                    class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm"
                >
                    Sign In
                </button>

                <div class="flex flex-row mt-5">
                    <hr class="h-[1px] bg-black w-[48%] mt-3" />
                    <div class="font-semibold">Or</div>
                    <hr class="h-[1px] bg-black w-[48%] mt-3" />
                </div>
                <button
                    class="flex flex-row justify-center items-center gap-2 mt-5 bg-gray-200 py-2 px-2 rounded-md shadow-sm"
                >
                    <img
                        :src="App.baseUrl + '/images/google-logo.svg'"
                        alt="Logo"
                    />
                    <span>Countinue with Google</span>
                </button>
            </div>
        </div>
        <div></div>
    </div>
</template>
