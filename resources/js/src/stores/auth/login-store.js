import { useVuelidate } from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { postData } from '../../helper/http';
import { getUserData, setUserData, showErrorToast, showSuccessToast } from '../../helper/utils';

export const useLoginStore = defineStore('login',() => {
    const currentStep = ref("currentStep");
    const step1 = ref("step1");
    const step2 = ref("step2");
    const loading = ref(false);

    const step1Input = ref({
        email: '',
    })
    const rulesStep1Input = {
        email: { required,email },
    }

    const step2Input = ref({
        password: '',
    })
    const rulesStep2Input = {
        password: { required },
    }

    const vStep1$ = useVuelidate(rulesStep1Input, step1Input);
    const vStep2$ = useVuelidate(rulesStep2Input, step2Input);

    async function next() {
        const valid = await vStep1$.value.$validate();
        if (!valid) {
            return false;
        }
        console.log(step1Input.value);
        currentStep.value = step2.value
    }

    function previous() {
        currentStep.value = step1.value
    }

    async function signin(){
        const valid = await vStep2$.value.$validate();
        if (!valid) {
            return false;
        }
        try{
            loading.value = true
            const data = await postData('/login',{...step2Input.value,...step1Input.value});
            console.log(data);
            setUserData(data);
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

    async function logout(){
        try{
            const userData = getUserData();
            loading.value = true
            const data = await postData('/logout',{
                userId: userData?.user?.id
            });
            // console.log(data);
            localStorage.clear();
            window.location.href = '/app/login';
            showSuccessToast(data.message);
            loading.value = false
        }catch(errors){
            loading.value = false
            for(const message of errors){
                showErrorToast(message);
            }
        }
    }

    return {
        next, previous, signin,logout, currentStep,step1,step2,step1Input,vStep1$,step2Input,vStep2$
    }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot) )
}
