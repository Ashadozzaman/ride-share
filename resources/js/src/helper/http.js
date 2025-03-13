import { App } from "../api/api";
import { getUserData } from "./utils";

function getHeaders() {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
    const userData = getUserData();
    if(typeof headers?.authorization !== 'undefined'){
        return headers;
    }else{
        headers['authorization'] = `Bearer ${userData?.token}`;
        return headers;
    }
    
}
export function postData(endpoint, inputData) {
    const headers = getHeaders();
    console.log(headers);
    return new Promise(async(resolve, reject) => {
        try {
            const response = await fetch(App.apiBaseUrl + endpoint, {
                method: 'POST',
                headers:headers,
                body: JSON.stringify(inputData),
            });
            const data = await response.json();
            handleHttpError(data,resolve,reject)

        } catch (error) {
            reject(error);
        }
    });
}

export function getData(endpoint) {
    const headers = getHeaders();
    return new Promise(async(resolve, reject) => {
        try {
            const response = await fetch(App.apiBaseUrl + endpoint, {
                method: 'GET',
                headers:headers,
            });
            const data = await response.json();
            
            handleHttpError(data,resolve,reject)
        } catch (error) {
            reject(error);
        }
    });
}

export function handleHttpError(data,resolve,reject){
    console.log(data?.message);
    if(typeof data?.errors !== 'undefined'){
        console.log(data);
        const errors = Array.isArray(data?.errors) ?
        data?.errors :
        Object.values(data?.errors);
        reject(errors);
    }else if(data?.message === 'Unauthenticated.'){
        window.location.href = '/app/login';
    }else{
        resolve(data);
    }
}
