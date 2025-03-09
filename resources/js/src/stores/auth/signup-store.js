import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { postData } from '../../helper/http';
import { setUserData, showErrorToast, showSuccessToast } from '../../helper/utils';

export const useSignupStore = defineStore('signup',() => {
    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");
    const step3 = ref("step3");
    const loading = ref(false);

    const step1Input = ref({
        name: '',
        email: '',
    })
    const rulesStep1Input = {
        name: { required },
        email: { required,email },
    }

    const step2Input = ref({
        password: '',
    })
    const rulesStep2Input = {
        password: { required },
    }

    const step3Input = ref({
        otp_code: '',
    })
    const rulesStep3Input = {
        otp_code: { required },
    }

    const vStep1$ = useVuelidate(rulesStep1Input, step1Input);
    const vStep2$ = useVuelidate(rulesStep2Input, step2Input);
    const vStep3$ = useVuelidate(rulesStep3Input, step3Input);


    async function moveStep1() {
        const valid = await vStep1$.value.$validate();
        if (!valid) {
            return false;
        }
        currentStep.value = step2.value
    }

    async function moveStep2() {
        const valid = await vStep2$.value.$validate();
        if (!valid) {
            return false;
        }
        try{
            loading.value = true
            const data = await postData('/register',{...step1Input.value,...step2Input.value});
            console.log(data);
            showSuccessToast(data.message);
            currentStep.value = step3.value
            loading.value = false
        }catch(errors){
            loading.value = false

            for(const message of errors){
                showErrorToast(message);
            }
        }
    }

    function backStep2() {
        currentStep.value = step1.value
    }
    function backStep3() {
        currentStep.value = step2.value
    }

    async function signupUser(){
        const valid = await vStep3$.value.$validate();
        if (!valid) {
            return false;
        }
        try{
            loading.value = true
            const data = await postData('/user/email-verification',{...step3Input.value,...step1Input.value});
            // console.log(data);
            setUserData(data);
            // localStorage.setItem('userData',JSON.stringify(...data?.user,...data?.token));
            window.location.href = '/app/dashboard';
            showSuccessToast(data.message);
            loading.value = false
        }catch(errors){
            loading.value = false

            for(const message of errors){
                showErrorToast(message);
            }
        }
    }

    return {  moveStep1,moveStep2,backStep2,backStep3, currentStep,step1,step2,step3,step1Input,vStep1$,step2Input,vStep2$,step3Input,vStep3$ ,signupUser,loading}
});
// For update data any place in the app this function will be called and update the data
if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useSignupStore, import.meta.hot) )
}
