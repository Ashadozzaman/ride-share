import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { postData, putData } from "../../helper/http";
import {
    getUserData,
    showErrorToast,
    showSuccessToast,
} from "../../helper/utils";

export const useUploadVehicleImageStore = defineStore(
    "upload-vehicle-image-store",
    () => {
        const modalVal = ref(false);
        const loading = ref(false);
        const uploadImageInput = ref({
            image: "",
            id: "",
        });

        async function addOrUpdateVehicle() {
            const valid = await vVehicle$.value.$validate();
            if (!valid) {
                return false;
            }
            try {
                loading.value = true;
                const data = edit.value
                    ? await putData("/vehicles", { ...vehicleInput.value })
                    : await postData("/vehicles", { ...vehicleInput.value });
                console.log(data);
                showSuccessToast(data.message);
                getVehicles();

                vVehicle$.value.$reset();
                // Clear the form fields
                vehicleInput.value = {};
                edit.value = false;
                modalVal.value = false;
                loading.value = false;
            } catch (errors) {
                console.log(errors);
                loading.value = false;
                for (const message of errors) {
                    showErrorToast(message);
                }
            }
        }
        function toggleModal() {
            edit.value = false;
            console.log(edit.value);
            modalVal.value = !modalVal.value;
            vehicleInput.value = {};
        }

        async function uploadVehicleImage() {
            return new Promise((resolve, reject) => {
                try {
                    const userData = getUserData();
                    const myHeaders = new Headers();
                    // myHeaders.append("Content-Type", "application/json");
                    myHeaders.append(
                        "authorization",
                        `Bearer ${userData?.token}`
                    );

                    const formdata = new FormData();
                    formdata.append("id", uploadImageInput.value.id);
                    formdata.append("images", uploadImageInput.value.image);

                    const uploadImagePayload = {
                        method: "POST",
                        headers: myHeaders,
                        body: formdata,
                    };
                    resolve(uploadImagePayload);
                } catch (error) {
                    reject(error);
                }
            });

        }

        return {
            toggleModal,
            modalVal,
            loading,
            uploadImageInput,
            uploadVehicleImage
        };
    }
);
if (import.meta.hot) {
    import.meta.hot.accept(
        acceptHMRUpdate(useUploadVehicleImageStore, import.meta.hot)
    );
}
