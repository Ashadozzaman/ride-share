import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useAutoCompleteStore = defineStore("auto-complete-store", () => {
    const places = ref({});
    const loading = ref(false);

    const showSuggestionDestination = ref(false);
    const showSuggestionPickup = ref(false);

    const queryDestination = ref("");
    const queryPickup = ref("");

    return {
        places,
        loading,
        showSuggestionDestination,
        showSuggestionPickup,
        queryDestination,
        queryPickup
    };
})

if(import.meta.hot){
    import.meta.hot.accept(
        acceptHMRUpdate(useAutoCompleteStore, import.meta.hot)
    )
}