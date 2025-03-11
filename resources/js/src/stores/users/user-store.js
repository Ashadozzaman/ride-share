import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { getData } from "../../helper/http";
import { showErrorToast } from "../../helper/utils";

export const useUsersStore = defineStore('user-store', () => {
    const userData = ref({});
    const loading = ref(false);
    async function getUsers(page = 1,query = ''){
        try{
            loading.value = true
            const data = await getData(`/users?page=${page}&query=${query}`);
            // console.log(data);
            userData.value = data;
            loading.value = false
        }catch(errors){
            loading.value = false
            for(const message of errors){
                showErrorToast(message);
            }
        }
    }
    return { userData,loading,getUsers }
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot) )
}
