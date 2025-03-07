import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";

export const useSignupStore = defineStore('signup',() => {
    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");
    const step3 = ref("step3");

    function moveStep1() {
        currentStep.value = step2.value
    }

    function moveStep2() {
        currentStep.value = step3.value
    }

    function backStep2() {
        currentStep.value = step1.value
    }
    function backStep3() {
        currentStep.value = step2.value
    }

    return {  moveStep1,moveStep2,backStep2,backStep3, currentStep,step1,step2,step3 }
});

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useSignupStore, import.meta.hot) )
}