<script setup>
import Leaflet from "leaflet";
import { onMounted, ref } from "vue";
const map = ref(null);

onMounted(() => {
    map.value = Leaflet.map("map").setView([51.505, -0.09], 20);

    Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);

    Leaflet.marker([51.5, -0.09])
        .addTo(map.value)
        .bindPopup("A pretty CSS popup.<br> Easily customizable.")
        .openPopup();
});
</script>
<template>
    <div class="h-screen w-full">
        <div class="h-screen w-full" id="map"></div>
    </div>
</template>
