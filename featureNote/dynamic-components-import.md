## Components Folder All folder Import by this code in app

```
const importIcon = import.meta.glob('./src/components/**/*.vue');
function registerComponent(app) {
    //Object.keys(importIcon) gives an array of file paths.
    for(const filePath of Object.keys(importIcon)){
        const componentName = filePath.split('/').pop()?.replace('.vue','');
        //  importIcon[filePath]() is a function call that triggers the dynamic import.
        // .pop() gets the last element
        // .then(function(data) {...}) waits for the module to load asynchronously.
        importIcon[filePath]().then(function(data){
            app.component(componentName, data?.default);
        }).catch((error) => console.error(error?.message));
    }
}

const app = createApp(App);
registerComponent(app);
```
