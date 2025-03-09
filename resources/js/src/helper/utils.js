import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const $toast = useToast();

export default {
    showToast(message, type) {
        $toast[type](message);
    }
}

export function showErrorToast(message) {
    $toast.error(message,{
        position:'bottom-right',
        duration: 4000,
        dismissible: true
    });
}

export function showSuccessToast(message) {
    $toast.success(message,{
        position:'bottom-right',
        duration: 4000,
        dismissible: true
    });
}

export function setUserData(data){
    localStorage.setItem('userData',JSON.stringify({
        user: data.user,
        token: data.token
    }));
}

export function getUserData(){
    try{
        const userData = localStorage.getItem('userData');
        if(typeof userData !== 'object'){
            const parsedData = JSON.parse(userData);
            return parsedData;
        }
    }catch(e){
        showErrorToast(e?.message     || 'Something went wrong');
    }
}
