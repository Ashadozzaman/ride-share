<template>
    <div class="ml-4 mr-4 w-full">
        <UserRoleModal
            :show="modalVal"
            :roles="roles"
            :loading="loading"
            @toggleModal="userStore.toggleModal"
        />
        <h1 class="text-2xl text-semibold mb-4">Users Page</h1>
        <!-- Search Input -->
        <div class="flex mb-5">
            <input
                v-model="userStore.query"
                @input="userStore.searchUsers"
                type="text"
                placeholder="Search..."
                class="border border-gray-300 rounded-md py-2 px-2"
            />
        </div>
        <UserTable
            @toggleModal="userStore.toggleModal"
            :users="userData?.data"
            :loading="loading"
            @get-users="userStore.getUsers"
        />
        <div class="mt-2">
            <TailwindPagination
                :data="userData"
                @pagination-change-page="userStore.getUsers"
            />
        </div>
    </div>
</template>
<script setup>
import { TailwindPagination } from "laravel-vue-pagination";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useUsersStore } from "../../../stores/users/user-store";
import UserRoleModal from "./components/UserRoleModal.vue";
import UserTable from "./components/UserTable.vue";
const userStore = useUsersStore();
const { userData, loading, modalVal, roles, modifyRole } =
    storeToRefs(userStore);
onMounted(() => {
    userStore.getUsers();
});
</script>
<style scoped>
button.relative.inline-flex.items-center.px-4.py-2.text-sm.font-medium.border.focus:z-20.border-blue-500 {
    background: #4f46e5 !important;
    color: white;
    border: 1px solid #4f46e5 !important;
}
</style>
