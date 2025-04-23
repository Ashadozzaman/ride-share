<script setup>
import { App } from "../../../../api/api";

const props = defineProps(["vehicles"]);
</script>
<template>
    <div
        class="flex flex-col shadow-md pb-2 gap-2"
        v-for="(vehicle, index) in vehicles"
        :key="vehicle?.id"
    >
        <div align="center">
            <!-- <img
                    :src="App.baseUrl + '/images/taxi.jpg'"
                    alt="Logo"
                /> -->
            <img
                :src="App.baseUrl + '/' + vehicle?.image"
                alt="Logo"
                height="300px"
                width="300px"
            />
            <div class="text-xl font-semibold py-1">
                <span>{{ vehicle?.name }}- {{ vehicle?.model }}</span>
            </div>
            <div>
                <span>{{ vehicle?.price }}$/Km</span>
            </div>
        </div>
        <div class="flex justify-center">
            <button
                class="flex gap-2 hover:bg-purple-500 border border-indigo-700 text-gray-600 hover:text-white font-bold py-2 px-2 rounded-md shadow-sm"
            >
                <span>Rent Now</span>
                <RightArrowIcon class="mt-1" />
            </button>
        </div>
    </div>
</template>
