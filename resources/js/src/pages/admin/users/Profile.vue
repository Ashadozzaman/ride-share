<script setup lang="ts">
import { App } from "../../../api/api";
import { ADMIN_ROLE, CUSTOMER_ROLE } from "../../../constants/roles";
import { getUserData } from "../../../helper/utils";
const userData = getUserData();

function showDriverStatus() {
    const role = userData?.user?.role;

    if (role === ADMIN_ROLE || role === CUSTOMER_ROLE) return false;
    return true;
}
</script>

<template>
    <div>
        <h1 class="text-2xl font-semibold">Profile</h1>
        <div class="mt-5 profile">
            <div class="flex flex-row text-xl">
                <div class="">
                    <img
                        :src="App.baseUrl + '/images/user.png'"
                        alt="Logo"
                        height="100px"
                        width="100px"
                    />
                    <div class="mt-5">
                        <label for="name"
                            ><strong>Name</strong>:
                            {{ userData.user.name }}</label
                        >
                    </div>
                    <div class="mt-5">
                        <label for="email"
                            ><strong>Email</strong>:
                            {{ userData.user.email }}</label
                        >
                    </div>
                    <div class="mt-5">
                        <label for="role"
                            ><strong>Role</strong>:
                            {{ userData.user.role }}</label
                        >
                    </div>
                    <hr
                        class="border border-t-1 border-gray-300 mt-2"
                        v-show="showDriverStatus()"
                    />
                    <div class="mt-5" v-show="showDriverStatus()">
                        <select
                            name="status"
                            id="status"
                            class="input-class-text"
                        >
                            <option value="">Status</option>
                            <option value="">Available</option>
                            <option value="">Unavailable</option>
                        </select>
                    </div>
                    <button
                        v-show="showDriverStatus()"
                        class="bg-indigo-600 text-white py-2 px-2 rounded-md shadow-sm mt-5 hover:bg-purple-500"
                    >
                        Change Status
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
