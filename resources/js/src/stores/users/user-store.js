import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { getData, postData } from "../../helper/http";
import { _debounce, showErrorToast, showSuccessToast } from "../../helper/utils";

export const useUsersStore = defineStore('user-store', () => {
    const userData = ref({});
    const loading = ref(false);

    const query = ref("");
    const page = ref(1);

    const modalVal = ref(false);
    const roles = ref(['ADMIN','CUSTOMER','DRIVER']);
    const userId = ref(null);
    function toggleModal(id){
        console.log(userId);
        modalVal.value =!modalVal.value
        userId.value = id
    }

    async function getUsers(page = 1){
        try{
            loading.value = true
            const data = await getData(`/users?page=${page}&query=${query.value}`);
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

    async function modifyRole(role){
        try{
            loading.value = true
            const data = await postData(`/users/role-modify`,{
                role: role,
                userId: userId.value
            });
            showSuccessToast(data?.message);
            loading.value = false
            getUsers()
        }catch(errors){
            loading.value = false
            for(const message of errors){
                showErrorToast(message);
            }
        }
    }


    const searchUsers = _debounce(function () {
        page.value = 1; // Reset to page 1 when searching
        getUsers(); // Call getUsers with updated query
    }, 200);

    return { userData,loading,getUsers,searchUsers ,toggleModal,modifyRole,query,page,modalVal,roles}
})

if(import.meta.hot){
    import.meta.hot.accept(acceptHMRUpdate(useUsersStore, import.meta.hot) )
}
