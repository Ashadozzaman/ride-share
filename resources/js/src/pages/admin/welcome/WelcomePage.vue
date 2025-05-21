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
                        <option
                            value=""
                            v-for="vehicle in vehicles?.data"
                            :key="vehicle?.id"
                        >
                            {{ vehicle?.name }}-{{ vehicle?.model }}-{{
                                vehicle?.price
                            }}$/Km
                        </option>
                    </select>
                    <div class="flex gap-1">
                        <SelectPickupInput
                            @selectPlace="selectPickup"
                            :placeHolder="'Pickup'"
                        />
                        <SelectDestinationInput
                            @selectPlace="selectDestination"
                            :placeHolder="'Destination'"
                        />
                        <!-- <AutoCompleteInput
                            @selectPlace="selectPickup"
                            :placeHolder="'Pickup'"
                        />
                        <AutoCompleteInput
                            @selectPlace="selectDestination"
                            :placeHolder="'Destination'"
                        /> -->
                        <!-- <input
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
                        /> -->
                    </div>
                    <button
                        @click="bookTaxi"
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
            <VehicleList :vehicles="vehicles?.data" />
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { App } from "../../../api/api";
import { useMapStore } from "../../../stores/map/map-store";
import { useAutoCompleteStore } from "../../../stores/vehicle/auto-complete-store";
import { useVehicleStore } from "../../../stores/vehicle/vehicle-store";
import SelectDestinationInput from "./components/SelectDestinationInput.vue";
import SelectPickupInput from "./components/SelectPickupInput.vue";
import VehicleList from "./components/VehicleList.vue";

// import RightArrowIcon from "../../components/icons/RightArrowIcon.vue";
const vehicleStore = useVehicleStore();
const { vehicles } = storeToRefs(vehicleStore);

const autoCompleteStore = useAutoCompleteStore();
const {
    showSuggestionPickup,
    showSuggestionDestination,
    queryPickup,
    queryDestination,
} = storeToRefs(autoCompleteStore);

const mapStore = useMapStore();
const { location, destination } = storeToRefs(mapStore);

function selectPickup(place) {
    location.value = place;
    showSuggestionPickup.value = false;
    queryPickup.value = place?.properties?.full_address;
}
function selectDestination(place) {
    mapStore.destination = place;
    showSuggestionDestination.value = false;
    queryDestination.value = place?.properties?.full_address;
}

const router = useRouter();
function bookTaxi() {
    router.push("/map");
}

onMounted(async () => {
    await vehicleStore.getVehicles();
});
</script>
