import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useLoginStore = defineStore('login',() => {
    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");

    function next() {
        currentStep.value = step2.value
    }

    function previous() {
        currentStep.value = step1.value
    }

    return { 
        next, previous, currentStep,step1,step2 }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot) )
}   