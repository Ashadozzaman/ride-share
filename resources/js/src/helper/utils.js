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