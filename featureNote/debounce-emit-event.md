## **Vue Component (`<script setup>` section)**

This is a Vue 3 component using the Composition API.

### **Imports**

```js
import { ref } from "vue";
import { _debounce } from "../../../../helper/utils";
```

-   `ref` is imported from Vue to create reactive state variables.
-   `_debounce` is a custom debounce function imported from a utility file.

### **Props & Events**

```js
const props = defineProps(["users"]);
const emit = defineEmits(["getUsers"]);
```

-   `defineProps(["users"])`: This allows the component to receive a `users` prop from its parent.
-   `defineEmits(["getUsers"])`: This declares that the component can emit a `"getUsers"` event.

### **Reactive Variables**

```js
const query = ref(""); // Stores the search input
const page = ref(1); // Stores the current page number
```

-   `query` is a reactive reference storing the search term.
-   `page` is a reactive reference storing the current page number.

### **Debounced Search Function**

```js
const searchUsers = _debounce(function () {
    emit("getUsers", page.value, query.value);
}, 200);
```

-   `_debounce` wraps the `searchUsers` function so that it only runs after **200 milliseconds** of inactivity.
-   It emits the `"getUsers"` event with the `page` and `query` values when triggered.

---

## **Debounce Utility Function (`_debounce`)**

```js
export function _debounce(cb, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer); // Clears the previous timer
        timer = setTimeout(() => cb(...args), delay); // Sets a new timer
    };
}
```

### **How it Works**

-   The function takes two parameters:
    -   `cb`: The callback function to execute after a delay.
    -   `delay`: The time (in milliseconds) to wait before executing `cb`.
-   Every time the returned function is called:
    -   It **clears the previous timer** (if any).
    -   It **sets a new timer** to execute `cb` after `delay` milliseconds.
-   This ensures that `cb` **only executes after the user stops triggering the function for 200ms**.

---

## **Use Case**

This is useful for:

-   **Search Input**: Prevents multiple API calls when typing.
-   **Scroll or Resize Events**: Reduces unnecessary function executions.
-   **Button Clicks**: Avoids multiple rapid clicks triggering an action.

---

### **Example Usage**

Imagine this is used in a **search input field**:

```vue
<input v-model="query" @input="searchUsers" placeholder="Search users..." />
```

-   Each time the user types, `searchUsers` is triggered.
-   The debounce function ensures that API calls are only made **after** the user stops typing for `200ms`.
