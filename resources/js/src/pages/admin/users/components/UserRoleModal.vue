<script setup>
import { ref } from "vue";
import { useUsersStore } from "../../../../stores/users/user-store";
const props = defineProps(["show", "roles", "loading"]);
const emit = defineEmits(["toggleModal"]);

const userStore = useUsersStore();
const role = ref("");
function changeRole(event) {
    console.log(event.target.value);
    role.value = event.target.value;
}

async function saveRole() {
    userStore.modifyRole(role.value);
}
</script>
<template>
    <BaseModal :show="props.show">
        <template #title> Edit User Role</template>
        <template #body>
            <select @change="changeRole" name="" class="input-class-text">
                <option value="">Select Role</option>
                <option v-for="role in roles" :key="role" :value="role">
                    {{ role }}
                </option>
            </select>
        </template>
        <template #footer>
            <button
                :disabled="loading"
                @click="saveRole()"
                class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm mt-5"
            >
                {{ loading ? "Saving..." : "Save" }}
            </button>
            <button
                @click="emit('toggleModal')"
                class="border border-indigo-700 text-gray-600 py-2 px-2 rounded-md shadow-sm mt-5"
            >
                Close
            </button>
        </template>
    </BaseModal>
</template>
