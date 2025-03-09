### **Explanation of Vue Toast Notification Setup & Usage**

This code integrates **vue-toast-notification** into a Vue 3 project to display success and error messages.

---

### **1. Register Toast Plugin (`app.js`)**

```js
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

app.use(ToastPlugin);
```

-   Imports `vue-toast-notification` and applies the **Bootstrap theme**.
-   Registers the plugin with `app.use(ToastPlugin);`, making it globally available.

---

### **2. Utility Functions for Toast (`utils.js`)**

```js
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

const $toast = useToast();
```

-   Imports `useToast()` to initialize the toast notification system.
-   Uses a **different theme (`theme-sugar.css`)**, which means this file may apply a different style than `app.js`.

#### **2.1. Exported Utility Functions**

```js
export function showErrorToast(message) {
    $toast.error(message, {
        position: "bottom-right",
        duration: 4000,
        dismissible: true,
    });
}
```

-   **`showErrorToast()`** displays an error toast **at the bottom-right** for **4 seconds** and is **dismissible**.

```js
export function showSuccessToast(message) {
    $toast.success(message, {
        position: "bottom-right",
        duration: 4000,
        dismissible: true,
    });
}
```

-   **`showSuccessToast()`** works similarly but for success messages.

---

### **3. Using Toast in API Response**

```js
const data = await postData("/register", {
    ...step1Input.value,
    ...step2Input.value,
});
showSuccessToast(data.message);

for (const message of errors) {
    showErrorToast(message);
}
```

#### **Step-by-Step Explanation**

1. **Send API Request:**

    - `postData('/register', { ...step1Input.value, ...step2Input.value })`  
      Sends form data (`step1Input` + `step2Input`) to the `/register` endpoint.

2. **Show Success Toast:**

    ```js
    showSuccessToast(data.message);
    ```

    - If the API call is successful, it shows a success toast with `data.message`.

3. **Show Error Toasts:**
    ```js
    for (const message of errors) {
        showErrorToast(message);
    }
    ```
    - If `errors` exist (likely from the API response), it loops through each `message` and shows an error toast.

---

### **Summary**

-   **Vue-toast-notification** is initialized in `app.js`.
-   **Utility functions (`utils.js`)** provide reusable toast functions (`showErrorToast`, `showSuccessToast`).
-   In case of **success**, a success toast is displayed.
-   In case of **errors**, multiple error toasts are shown (one for each error message).
