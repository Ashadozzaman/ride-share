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
                reject(data?.errors);
            }else{
                resolve(data);
            }

        } catch (error) {
            reject(error);
        }
    });
}