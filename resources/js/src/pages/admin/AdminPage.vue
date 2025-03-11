<template>
    <div class="">
        <Sidebar>
            <template #main>
                <RouterView />
            </template>
        </Sidebar>
    </div>
</template>
<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/SideBar.vue";
</script>
<style scoped></style>
