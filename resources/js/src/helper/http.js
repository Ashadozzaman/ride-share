import { App } from "../api/api";
export function postData(endpoint, inputData) {
    return new Promise(async(resolve, reject) => {
        try {
            const response = await fetch(App.apiBaseUrl + endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(inputData),
            });
            const data = await response.json();
            if(typeof data?.errors !== 'undefined'){
                console.log(data);
                const errors = Array.isArray(data?.errors) ?
                data?.errors :
                Object.values(data?.errors);
                reject(errors);
            }else{
                resolve(data);
            }

        } catch (error) {
            reject(error);
        }
    });
}
