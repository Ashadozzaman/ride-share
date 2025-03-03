Laravel Intallation & API setup

-   php artisan install:api
-   npm i -D @vitejs/plugin-vue
-   npm i vue@latest
-   npm vue-route@4
-   tailwindcss installation
    -   npm install -D tailwindcss@3
    -   npm install -D tailwindcss postcss autoprefixer

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
