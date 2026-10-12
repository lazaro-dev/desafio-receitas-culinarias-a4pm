import type { User } from "@/entities/user";
import { AuthService } from "@/services/auth.service";
import type { CredentialsDTO, RegisterCredentialsDTO } from "@/services/dtos/auth.dto";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const STORAGE_TOKEN_KEY = "auth_token";
const STORAGE_USER_KEY = "auth_user";

export const useAuthStore = defineStore("auth", () => {

    const token = ref(getTokenFromStorage());
    const user = ref<User | null>(getUserFromStorage());

    function getUserFromStorage() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_USER_KEY)!) as User;
        } catch {
            return null;
        }
    }

    function getTokenFromStorage() {
        return localStorage.getItem(STORAGE_TOKEN_KEY);
    }

    async function signIn(dto: CredentialsDTO) {
        const response = await AuthService.login(dto);

        if (response.user) {
            localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.user));
            user.value = response.user;
        }

        if (response.token) {
            localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
            token.value = response.token;
        }

        return response;
    }

    async function register(formData: RegisterCredentialsDTO) {
        const response = await AuthService.register(formData);

        if (response.user) {
            localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(response.user));
            user.value = response.user;
        }

        if (response.token) {
            localStorage.setItem(STORAGE_TOKEN_KEY, response.token);
            token.value = response.token;
        }

        return response;
    }

    function logout() {
        token.value = null;
        user.value = null;

        localStorage.removeItem(STORAGE_TOKEN_KEY);
        localStorage.removeItem(STORAGE_USER_KEY);
        
        window.location.href = "/entrar";
    }

    const isAuth = computed(() => !!token.value);

    return {
        signIn,
        register,
        logout,
        isAuth,
        user,
        token
    };
});
