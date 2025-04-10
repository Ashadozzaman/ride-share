<template>
    <div class="bg-white flex flex-col p-2 w-full">
        <!-- <h3 class="text-2xl font-semibold">Wellcome Page</h3> -->
        <div class="flex items-center justify-center p-10">
            <div class="flex items-center space-x-6">
                <img
                    class="w-[50%]"
                    :src="App.baseUrl + '/images/1742365434.png'"
                />
                <div class="flex flex-col space-y-4">
                    <h1 class="text-2xl font-bold text-center">
                        Trust the leading and most reliable Bangladeshi taxi
                        service provider
                    </h1>
                    <select name="" id="" class="input-class-text">
                        <option value="">Select Taxi</option>
                        <option value="">Taxi 1</option>
                        <option value="">Taxi 2</option>
                    </select>
                    <div class="flex gap-1">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Pickup"
                            class="input-class-text"
                        />
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Destination"
                            class="input-class-text"
                        />
                    </div>
                    <button
                        class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm"
                    >
                        <span>Book Taxi Now</span>
                    </button>
                </div>
            </div>
        </div>
        <div
            class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
        >
            <div
                class="flex flex-col shadow-md pb-2 gap-2"
                v-for="car in [1, 2, 3, 4, 5]"
                :key="car"
            >
                <div align="center">
                    <!-- <img
                    :src="App.baseUrl + '/images/vehicle-icon.png'"
                    alt="Logo"
                /> -->
                    <img
                        :src="App.baseUrl + '/images/taxi.jpg'"
                        alt="Logo"
                        height="300px"
                        width="300px"
                    />
                    <div class="text-xl font-semibold py-1">
                        <span>Tesla Modal Y</span>
                    </div>
                    <div>
                        <span>12$/Km</span>
                    </div>
                </div>
                <div class="flex justify-center">
                    <button
                        class="flex gap-2 hover:bg-purple-500 border border-indigo-700 text-gray-600 hover:text-white font-bold py-2 px-2 rounded-md shadow-sm"
                    >
                        <span>Rent Now</span>
                        <RightArrowIcon />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { App } from "../../../api/api";

// import RightArrowIcon from "../../components/icons/RightArrowIcon.vue";
</script>
