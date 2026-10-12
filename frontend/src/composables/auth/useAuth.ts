import type { CredentialsDTO, RegisterCredentialsDTO } from "@/services/dtos/auth.dto";
import { useAuthStore } from "@/stores/useAuthStore";
import { useToastNotification } from "@/composables/ui/useToastNotification";
import { toStringApiValidationError } from "@/helpers/isApiValidationError";
import { useRouter } from "vue-router";
import { ref } from "vue";

export function useAuth() {
    const authStore = useAuthStore();
    const notification = useToastNotification();
    const router = useRouter();

    const loading = ref(false);

    const register = async (credentials: RegisterCredentialsDTO) => {
        loading.value = true;
        try {

            await authStore.register(credentials);

            notification.showSuccess('bem vindo(a) ao site!');
            redirectHome();
            return true;
        } catch (error: unknown) {

            notification.showError(toStringApiValidationError(error));

            return false;
        } finally {
            loading.value = false;
        }
    }

    const signIn = async (credentials: CredentialsDTO) => {
        loading.value = true;
        try {

            await authStore.signIn(credentials);

            notification.showSuccess('bem vindo(a) ao site!');
            redirectHome();
            return true;
        } catch (error: unknown) {
            notification.showError(toStringApiValidationError(error));
            return false;
        } finally {
            loading.value = false;
        }
    }

    const logout = () => authStore.logout();

    const redirectHome = () => router.push({ name: 'recipes' });

    return {
        loading,
        logout,
        register,
        signIn
    }
}