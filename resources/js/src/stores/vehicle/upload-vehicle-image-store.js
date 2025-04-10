import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import {
    getUserData
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


        function toggleModal() {
            edit.value = false;
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
