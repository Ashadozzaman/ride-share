<script setup>
import { ref } from "vue";
import { App } from "../../../../api/api";
import { _debounce } from "../../../../helper/utils";
const props = defineProps(["vehicles"]);

const emit = defineEmits([
    "getvehicles",
    "toggleModal",
    "editVehicle",
    "removeVehicle",
    "uploadImage",
]);
const query = ref("");
const page = ref(1);

const searchvehicles = _debounce(function () {
    emit("getvehicles", page.value, query.value);
}, 200);
</script>
<template>
    <div class="flex mb-5">
        <!-- <button
            class="ml-2 bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm"
            @click="emit('toggleModal')"
        >
            Add Vehicles
        </button> -->
        <!-- <input @keydown="searchUsers" v-model="query" type="text" placeholder="Search..."
            class="border border-gray-300 rounded-md py-2 px-2" /> -->
    </div>
    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <th class="border border-gray-300 py-2 px-4">#</th>
                <th class="border border-gray-300 py-2 px-4">Image</th>
                <th class="border border-gray-300 py-2 px-4">Name</th>
                <th class="border border-gray-300 py-2 px-4">Model</th>
                <th class="border border-gray-300 py-2 px-4">Price</th>
                <th class="border border-gray-300 py-2 px-4">UploadImage</th>
                <th class="border border-gray-300 py-2 px-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="text-left"
                v-for="(vehicle, index) in vehicles"
                :key="vehicle?.id"
            >
                <td class="border border-gray-300 py-2 px-4">
                    {{ index + 1 }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    <img
                        :src="App.baseUrl + '/' + vehicle?.image"
                        alt=""
                        class="w-24"
                    />
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ vehicle?.name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ vehicle?.model }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    ${{ vehicle?.price }}
                </td>

                <td class="border border-gray-300 py-2 px-4">
                    <a
                        class="bg-indigo-400 text-white py-2 px-2 rounded-md shadow-sm cursor-pointer"
                        @click="emit('uploadImage', vehicle?.id)"
                    >
                        UploadImage
                    </a>
                </td>

                <td class="border border-gray-300 py-2 px-4">
                    <div class="flex flex-row gap-2">
                        <a
                            class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm cursor-pointer hover:bg-indigo-900"
                            @click="emit('editVehicle', vehicle)"
                        >
                            Edit
                        </a>
                        <a
                            class="bg-slate-200 text-black-400 py-2 px-2 rounded-md shadow-sm cursor-pointer hover:bg-slate-500 hover:text-white"
                            @click="emit('removeVehicle', vehicle?.id)"
                        >
                            Delete
                        </a>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
