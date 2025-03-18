<template>
    <div class="h-screen flex">
        <nav :class="`h-full bg-slate-50 ${toggleSidebar ? 'w-[210px]' : ''} `">
            <div class="flex flex-row justify-between p-3">
                <img v-show="toggleSidebar ? true : false" :src="App.baseUrl + '/images/logo.png'" class="w-10" src=""
                    alt="" />
                <button @click="toggle" class="hover:bg-slate-200 cursor-pointer p-2 rounded-md">
                    <ChevroIcon v-if="toggleSidebar" />
                    <ChevronIconRight v-else />
                </button>
            </div>
            <ul class="flex flex-col gap-1 p-3">
                <li class="flex gap-1 bg-slate-200 cursor-pointer p-2 rounded-md">
                    <HomeIcon class="mt-1" />
                    <span v-show="toggleSidebar">Home</span>
                </li>
                <li class="flex gap-1 hover:bg-slate-200 cursor-pointer p-2 rounded-md">
                    <PaymentIcon class="mt-1" />
                    <span v-show="toggleSidebar">Payments</span>
                </li>
                <li class="flex gap-1 hover:bg-slate-200 cursor-pointer p-2 rounded-md">
                    <router-link to="/users" class="flex gap-1">
                        <UserIcon class="mt-1" />
                        <span v-show="toggleSidebar">Users</span>

                    </router-link>
                </li>

                <li class="flex gap-1 hover:bg-slate-200 cursor-pointer p-2 rounded-md">
                    <router-link to="/vehicles" class="flex gap-1">
                        <CarIcon class="mt-1" />
                        <span v-show="toggleSidebar">Vehicles</span>

                    </router-link>
                </li>
                <hr />
                <li class="flex gap-1 text-red-600 hover:bg-slate-200 cursor-pointer p-2 rounded-md">
                    <LogoutIcon class="mt-1" />
                    <span v-show="toggleSidebar">Logout</span>
                </li>
            </ul>
        </nav>
        <!-- main section start  -->
        <div class="bg-slate-200 w-full">
            <div class="flex justify-between">
                <div></div>
                <!-- Some content here -->
                <div class="p-3">
                    <img @click="toggleTopManuBar" :src="App.baseUrl + '/images/user.png'"
                        class="rounded-full w-10 h-10 cursor-pointer border-2 hover:border-indigo-600" alt="logo" />
                    <ul v-show="toggleTopManu"
                        class="bg-white absolute right-4 p-3 rounded-md divide-y divide-gray-300 w-[250px]">
                        <li class="p-2">
                            {{ users?.user?.name }}
                            <br />

                            <a class="text-indigo-600" href="">
                                {{ users?.user?.email }}</a>
                        </li>
                        <li @click="loginStore.logout"
                            class="p-2 hover:bg-gray-100 rounded-md cursor-pointer text-red-600 fot-semibold">
                            <a href="">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex p-10">
                <!-- <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                    quod itaque porro ex, temporibus obcaecati quaerat tenetur
                    vero ratione aliquam quis! Ex ipsam omnis quam. Vero ratione
                    accusamus veritatis nesciunt!
                </p> -->
                <slot name="main"></slot>
            </div>
        </div>
        <!-- main section end -->
    </div>
</template>
<script setup>
import { ref } from "vue";
import { App } from "../../../api/api";
import { getUserData } from "../../../helper/utils";
import { useLoginStore } from "../../../stores/auth/login-store";

const toggleSidebar = ref(false);
const toggleTopManu = ref(false);
const loginStore = useLoginStore();

const users = getUserData();

function toggle() {
    toggleSidebar.value = !toggleSidebar.value;
}

function toggleTopManuBar() {
    toggleTopManu.value = !toggleTopManu.value;
}
</script>
<style scoped></style>
