<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { _debounce } from "../../../../helper/utils";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";
const props = defineProps(["placeHolder"]);
const showSuggestions = ref(false);
const vehicleStore = useVehicleStore();
const { places } = storeToRefs(vehicleStore);
const query = ref("");
const search = _debounce(async function () {
    await vehicleStore.getPlaces(query.value);
});

function hideSuggestions() {
    setTimeout(() => {
        (showSuggestions.value = false), 100;
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
                @focus="showSuggestions = true"
                @blur="hideSuggestions"
                v-model="query"
                @keydown="search"
                type="text"
                :placeholder="placeHolder"
                class="input-class-text pl-10"
            />
        </div>
        <ul
            v-show="showSuggestions"
            class="w-full z-10 rounded-md shadow-md overflow-y-auto"
        >
            <li
                v-for="place in places"
                :key="place?.properties"
                v-show="
                    place?.properties?.place_formatted === '' ? false : true
                "
                class="bg-gray-100 p-2 hover:bg-blue-200"
            >
                {{ place?.properties?.place_formatted }}
            </li>
        </ul>
    </div>
</template>
