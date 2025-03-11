<template>
    <div class="ml-4 mr-4 w-full">
        <h1 class="text-2xl text-semibold mb-4">Users Page</h1>
        <UserTable
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
import UserTable from "./components/UserTable.vue";
const userStore = useUsersStore();
const { userData, loading } = storeToRefs(userStore);
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
