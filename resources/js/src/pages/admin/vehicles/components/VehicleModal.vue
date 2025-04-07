<script setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useVehicleStore } from "../../../../stores/vehicle/vehicle-store";

const props = defineProps(["show", "loading"]);
const emit = defineEmits(["toggleModal"]);
const vehicleStore = useVehicleStore();
const { vehicleInput, vVehicle$, addVehicle, edit } = storeToRefs(vehicleStore);
const saveBtnLabel = computed(() => (edit.value ? "Update" : "Save"));
const titleLabel = computed(() => (edit.value ? "Update" : "Add"));
async function vehicleFormSubmit() {
    vehicleStore.addOrUpdateVehicle();
}
</script>
<template>
    <BaseModal :show="props.show">
        <template #title> {{ titleLabel }} Vehicle</template>
        <template #body>
            <InputError :errors="vVehicle$.name.$errors">
                <label for="name" class="text-gray-600">Name</label>
                <input
                    v-model="vehicleInput.name"
                    type="text"
                    class="input-class-text mb-2"
                    placeholder="Enter Name"
                />
            </InputError>
            <InputError :errors="vVehicle$.model.$errors">
                <label for="name" class="text-gray-600">Model</label>
                <input
                    v-model="vehicleInput.model"
                    type="text"
                    class="input-class-text mb-2"
                    placeholder="Enter Model"
                />
            </InputError>
            <InputError :errors="vVehicle$.price.$errors">
                <label for="name" class="text-gray-600">Price/km</label>
                <input
                    v-model="vehicleInput.price"
                    type="text"
                    class="input-class-text mb-2"
                    placeholder="Enter Price"
                />
            </InputError>
        </template>
        <template #footer>
            <button
                :disabled="loading"
                @click="vehicleFormSubmit()"
                class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm mt-5"
            >
                {{ loading ? "Saving..." : saveBtnLabel }}
            </button>
            <button
                @click="emit('toggleModal')"
                class="border cursor-pointer border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm mt-5"
            >
                Close
            </button>
        </template>
    </BaseModal>
</template>
