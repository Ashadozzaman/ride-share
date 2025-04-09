<script setup>
import { storeToRefs } from "pinia";
import { App } from "../../../../api/api";
import { showErrorToast, showSuccessToast } from "../../../../helper/utils";
import { useUploadVehicleImageStore } from "../../../../stores/vehicle/upload-vehicle-image-store";

const uploadVehicleImageStore = useUploadVehicleImageStore();
const { uploadImageInput, loading, modalVal } = storeToRefs(
    uploadVehicleImageStore
);

const props = defineProps(["show", "loading"]);
const emit = defineEmits(["toggleModal", "getVehicles"]);

function selectImage(event) {
    const selectedImage = event.target.files[0];
    const output = document.querySelector("#outputImage");
    output.src = URL.createObjectURL(selectedImage);
    output.onload = function () {
        URL.revokeObjectURL(selectedImage);
    };
    uploadImageInput.value.image = selectedImage;
}

async function uploadImage() {
    const payload = await uploadVehicleImageStore.uploadVehicleImage();
    loading.value = true;
    console.log(payload);
    fetch(App.apiBaseUrl + "/vehicles/images", payload)
        .then((response) => response.json())
        .then(async (result) => {
            document.querySelector("#outputImage").src = "";
            document.querySelector("#imageField").value = "";
            loading.value = false;
            modalVal.value = false;
            showSuccessToast(result.message);
            await emit("getVehicles");
        })
        .catch((error) => {
            showErrorToast(error?.message);
            loading.value = false;
        });
}
</script>
<template>
    <BaseModal :show="props.show">
        <template #title> Upload Image</template>
        <template #body>
            <img src="" style="height: 150px" alt="Image" id="outputImage" />
            <label for="name" class="text-gray-600">Image</label>
            <input
                type="file"
                @change="selectImage"
                id="imageField"
                class="input-class-text mb-2"
            />
        </template>
        <template #footer>
            <button
                :disabled="loading"
                @click="uploadImage()"
                class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm mt-5"
            >
                {{ loading ? "uploading..." : "Upload" }}
            </button>
            <button
                @click="modalVal = false"
                class="border cursor-pointer border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm mt-5"
            >
                Close
            </button>
        </template>
    </BaseModal>
</template>
