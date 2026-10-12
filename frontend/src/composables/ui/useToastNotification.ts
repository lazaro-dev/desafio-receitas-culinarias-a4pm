import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

export function useToastNotification() {
    const toast = useToast();

    const showSuccess = (msg: string = 'Sucesso!', duration = 2500) => {
        toast.success(msg, { duration, position: 'top-right' })
    };

    const showError = (msg: string = 'Erro ao realizar operação!', duration = 3500) => {
        toast.error(msg, {
            duration,
            position: 'top-right'
        });
    };


    const showWarning = (msg: string = 'Atenção!', duration = 4000) => {
        toast.warning(msg, {
            duration,
            position: 'top-right'
        });
    };

    const showInfo = (msg: string, duration = 4000) => toast.info(msg, { duration, position: 'top-right' });

    return {
        showSuccess,
        showError,
        showWarning,
        showInfo
    };
}
