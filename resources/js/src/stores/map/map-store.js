import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useMapStore = defineStore("map-store", () => {
    const loading = ref(false);
    const destination = ref("");
    const location = ref("");
    return { loading, destination, location };
});
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}
