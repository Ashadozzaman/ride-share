Laravel Intallation & API setup

-   php artisan install:api
-   npm i -D @vitejs/plugin-vue
-   npm i vue@latest
-   npm vue-route@4
-   tailwindcss installation
    -   npm install -D tailwindcss@3
    -   npm install -D tailwindcss postcss autoprefixer

## Project Run

```
composer install
npm install
npm run dev
npm run build-css
php artian migrate
php artisan serve
```

```
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue(),
        tailwindcss(),
    ],
});


 /** @type {import('tailwindcss').Config} */
 export default {
    content: ["./resources/js/src/**/*.{vue,js}"],
    theme: {
      extend: {},
    },
    plugins: [],
  }

```

## Keep Alive

-   Cache Component, use for dynamic component

### vue 3

-   Composition API
-   vue toast msg
-   vueidalte(validation)
-   penia(state management)
-   Vehicle CRUD With
-   File Upload via FormData

### Mapbox

-- Auto Complete Location

### Leaflet Lib

-Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps. Weighing just about 42 KB of JS, it has all the mapping features most developers ever need.

### Leaflet Routing Machine

-   Easy, flexible routing for Leaflet

### TO DO
