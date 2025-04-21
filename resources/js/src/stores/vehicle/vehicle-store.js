import useVuelidate from "@vuelidate/core";
import { numeric, required } from "@vuelidate/validators";
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { deleteData, getData, postData, putData } from "../../helper/http";
import { showErrorToast, showSuccessToast } from "../../helper/utils";

export const useVehicleStore = defineStore("vehicle-store", () => {
    const vehicles = ref({});
    const places = ref({});
    const loading = ref(false);

    const query = ref("");
    const page = ref(1);

    const modalVal = ref(false);
    const vehicleId = ref(null);
    const edit = ref(false);

    const vehicleInput = ref({
        name: "",
        model: "",
        price: "",
    });
    const rulesVehicleInput = {
        name: { required },
        model: { required },
        price: { required, numeric },
    };

    const vVehicle$ = useVuelidate(rulesVehicleInput, vehicleInput);

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

    async function getVehicles(page = 1) {
        try {
            loading.value = true;
            const data = await getData(
                `/vehicles?page=${page}&query=${query.value}`
            );
            // console.log(data);
            vehicles.value = data;
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showErrorToast(message);
            }
        }
    }

    async function getPlaces(query = "") {
        try {
            loading.value = true;
            const data = await getData(`/places?query=${query}`);
            // console.log(data);
            places.value = data?.features;
            loading.value = false;
        } catch (errors) {
            loading.value = false;
            for (const message of errors) {
                showErrorToast(message);
            }
        }
    }

    async function deleteVehicle(id) {
        try {
            loading.value = true;
            const data = await deleteData("/vehicles", { id: id });
            console.log(data);
            showSuccessToast(data.message);
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

    return {
        vehicles,
        loading,
        getVehicles,
        query,
        page,
        modalVal,
        toggleModal,
        deleteVehicle,
        vehicleId,
        vehicleInput,
        vVehicle$,
        addOrUpdateVehicle,
        edit,
        getPlaces,
        places
    };
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useVehicleStore, import.meta.hot));
}
