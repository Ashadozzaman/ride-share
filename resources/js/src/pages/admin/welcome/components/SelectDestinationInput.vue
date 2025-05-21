<script setup lang="ts">
import { storeToRefs } from "pinia";
import { _debounce } from "../../../../helper/utils";
import { useAutoCompleteStore } from "../../../../stores/vehicle/auto-complete-store";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";

const props = defineProps(["placeHolder"]);

const vehicleStore = useVehicleStore();
const { places } = storeToRefs(vehicleStore);

const autoCompleteStore = useAutoCompleteStore();
const { showSuggestionDestination, queryDestination } =
    storeToRefs(autoCompleteStore);

const emit = defineEmits(["selectPlace"]);
const search = _debounce(async function () {
    await vehicleStore.getPlaces(queryDestination.value);
});

function hideSuggestions() {
    setTimeout(() => {
        (showSuggestionDestination.value = false), 100;
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
                @focus="showSuggestionDestination = true"
                v-model="queryDestination"
                @keydown="search"
                type="text"
                :placeholder="placeHolder"
                class="input-class-text pl-10"
            />
        </div>
        <ul
            v-show="showSuggestionDestination"
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
