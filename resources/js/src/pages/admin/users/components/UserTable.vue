<script setup>
import { ref } from "vue";
import { _debounce } from "../../../../helper/utils";
const props = defineProps(["users"]);

const emit = defineEmits(["getUsers", "toggleModal"]);
const query = ref("");
const page = ref(1);

const searchUsers = _debounce(function () {
    emit("getUsers", page.value, query.value);
}, 200);
</script>
<template>
    <div class="flex mb-5">
        <!-- <input @keydown="searchUsers" v-model="query" type="text" placeholder="Search..."
            class="border border-gray-300 rounded-md py-2 px-2" /> -->
    </div>
    <table class="bg-white rounded-md w-full shadow-md border border-gray-300">
        <thead>
            <tr class="bg-gray-100 text-left">
                <th class="border border-gray-300 py-2 px-4">#</th>
                <th class="border border-gray-300 py-2 px-4">Name</th>
                <th class="border border-gray-300 py-2 px-4">Email</th>
                <th class="border border-gray-300 py-2 px-4">Role</th>
                <th class="border border-gray-300 py-2 px-4">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr
                class="text-left"
                v-for="(user, index) in users"
                :key="user?.id"
            >
                <td class="border border-gray-300 py-2 px-4">
                    {{ index + 1 }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ user?.name }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    <a :href="'mailto:' + user?.email" class="text-indigo-600">
                        {{ user?.email }}</a
                    >
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    {{ user?.role }}
                </td>
                <td class="border border-gray-300 py-2 px-4">
                    <a
                        class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm cursor-pointer"
                        @click="emit('toggleModal', user?.id)"
                    >
                        Edit
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
