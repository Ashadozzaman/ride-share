<script setup lang="ts">
import { storeToRefs } from "pinia";
import { App } from "../../../../api/api";
import { _debounce } from "../../../../helper/utils";
import { useAutoCompleteStore } from "../../../../stores/vehicle/auto-complete-store";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";

const props = defineProps(["placeHolder", "loading"]);

const vehicleStore = useVehicleStore();
const { places } = storeToRefs(vehicleStore);

const autoCompleteStore = useAutoCompleteStore();
const { showSuggestionPickup, queryPickup } = storeToRefs(autoCompleteStore);

const emit = defineEmits(["selectPlace"]);
const search = _debounce(async function () {
    await vehicleStore.getPlaces(queryPickup.value);
});

function hideSuggestions() {
    setTimeout(() => {
        (showSuggestionPickup.value = false), 100;
    });
}
</script>

<template>
    <div class="relative w-full max-w-sm">
        <div class="relative">
            <span
                class="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none"
            >
                <MapPinIcon class="h-5 w-5" />
            </span>
            <input
                @focus="showSuggestionPickup = true"
                v-model="queryPickup"
                @keydown="search"
                type="text"
                :placeholder="placeHolder"
                class="input-class-text"
            />

            <span
                class="absolute inset-y-0 right-0 pl-3 flex items-center pointer-events-none"
                v-show="loading"
            >
                <img
                    :src="App.baseUrl + '/images/loading.gif'"
                    width="20px"
                    alt=""
                />
            </span>
        </div>
        <ul
            v-show="showSuggestionPickup"
            class="w-full z-10 rounded-md shadow-md overflow-y-auto"
        >
            <li
                v-for="place in places"
                :key="place?.properties"
                v-show="place?.properties?.full_address === '' ? false : true"
                class="bg-gray-100 p-2 hover:bg-blue-200 cursor-pointer"
                @click="emit('selectPlace', place)"
            >
                {{ place?.properties?.full_address }}
            </li>
        </ul>
    </div>
</template>
