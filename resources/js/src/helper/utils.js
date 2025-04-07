import Swal from 'sweetalert2/dist/sweetalert2.js';
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
        showErrorToast(e?.message || 'Something went wrong');
    }
}

export function _debounce(cb, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => cb(...args), delay);
    };
}

export function confirmDelation(message){
    return new Promise((resolve, reject) => {

    Swal.fire({
        title: "Are you sure?",
        text: typeof message === 'undefined' ? "You won't be able to revert this!" : message,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            resolve(result.isConfirmed)
        //   Swal.fire({
        //     title: "Deleted!",
        //     text: "Your file has been deleted.",
        //     icon: "success"
        //   });
        }
        reject();
      });
    })
}