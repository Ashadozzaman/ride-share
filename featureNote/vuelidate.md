### **Short Explanation of Vuelidate Setup**

#### **1. Installation**

Install Vuelidate using npm:

```sh
npm install @vuelidate/core @vuelidate/validators
```

#### **2. Import & Setup Validation**

-   Import `useVuelidate` and validators (`required`, `email`).
-   Define form data (`step1Input`).
-   Create validation rules (`rulesStep1Input`).
-   Initialize validation (`vStep1$`).

```js
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

const step1Input = ref({ name: "", email: "" });
const rulesStep1Input = { name: { required }, email: { required, email } };
const vStep1$ = useVuelidate(rulesStep1Input, step1Input);
```

#### **3. Validate on Step Change**

-   Call `$validate()` before moving to the next step.

```js
async function moveStep1() {
    const valid = await vStep1$.value.$validate();
    if (!valid) return false;
    currentStep.value = step2.value;
}
```

#### **4. Use Validation in Component**

-   Bind input fields to validation (`vStep1$`).
-   Display validation errors using `<InputError>`.

```vue
<InputError :errors="vStep1$.name.$errors">
    <input v-model="step1Input.name" type="text" class="input-class-text" placeholder="Enter Name" />
</InputError>
```

#### **5. Error Component (`InputError.vue`)**

-   Displays error messages if validation fails.

```vue
<template>
    <div :class="{ error: props.errors.length }">
        <slot></slot>
        <div
            class="input-errors"
            v-for="error of props.errors"
            :key="error.$uid"
        >
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps(["errors"]);
</script>
```

### **Summary**

-   Vuelidate is used for form validation in Vue 3.
-   `useVuelidate` initializes validation rules.
-   `$validate()` checks validation before proceeding.
-   Errors are displayed dynamically using a reusable component.
