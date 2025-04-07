<template>
    <div class="ml-4 mr-4 w-full">
        <VehicleModal
            :show="modalVal"
            :loading="loading"
            @toggleModal="vehicleStore.toggleModal"
        />
        <h1 class="text-2xl text-semibold mb-4">Vehicales Page</h1>
        <!-- Search Input -->
        <div class="flex justify-between mb-5">
            <input
                type="text"
                placeholder="Search..."
                class="border border-gray-300 rounded-md py-2 px-2"
            />
            <button
                class="ml-2 bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm"
                @click="vehicleStore.toggleModal"
            >
                Add Vehicles
            </button>
        </div>
        <VehicleTable
            :vehicles="vehicles?.data"
            :loading="loading"
            @toggleModal="vehicleStore.toggleModal"
            @editVehicle="editVehicle"
            @removeVehicle="removeVehicle"
        />
        <div class="mt-2">
            <!-- <TailwindPagination /> -->
        </div>
    </div>
</template>
<script setup>
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { confirmDelation } from "../../../helper/utils";
import { useVehicleStore } from "../../../stores/vehicle/vehicle-store";
import VehicleModal from "./components/VehicleModal.vue";
import VehicleTable from "./components/VehicleTable.vue";
// const emit = defineEmits(["toggleModal"]);

const vehicleStore = useVehicleStore();
const { vehicles, loading, modalVal, toggleModal, edit, vehicleInput } =
    storeToRefs(vehicleStore);
function editVehicle(vehicle) {
    edit.value = true;
    vehicleInput.value = vehicle;
    // alert(edit.value);
    modalVal.value = true;
}

function removeVehicle(id) {
    confirmDelation("Are you sure you want to delete this vehicle?").then(
        async () => {
            await vehicleStore.deleteVehicle(id);
            vehicleStore.getVehicles();
        }
    );
    // vehicleStore.removeVehicle(id);
}

onMounted(() => {
    vehicleStore.getVehicles();
});
</script>
<style scoped>
button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus:z-20.border-blue-500 {
    background: #4f46e5 !important;
    color: white;
    border: 1px solid #4f46e5 !important;
}
</style>
