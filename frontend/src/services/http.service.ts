import { useAuthStore } from "@/stores/useAuthStore";

export class HttpService {

    static baseUrl = (import.meta.env.VITE_API_URL as string) + '/api/v1';

    static getHeaders(withToken: boolean = false) {
        const authStore = useAuthStore();
        
        if (withToken) {
            return {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authStore.token
            } as Record<string, string>;
        }

        return {
            'Content-Type': 'application/json'
        } as Record<string, string>;
    }

    static async get<T>(url: string, withToken: boolean = false) {
        const response = await fetch(this.baseUrl + url, {
            method: 'GET',
            headers: this.getHeaders(withToken),
        });

        const json = await response.json();

        if (!response.ok) {
            throw json;
        }

        return json as T;
    }

    static async post<T>(url: string, data: unknown, withToken: boolean = false) {
        const response = await fetch(this.baseUrl + url, {
            method: 'POST',
            headers: this.getHeaders(withToken),
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            throw json;
        }


        return json as T;
    }

    static async put<T>(url: string, data: unknown, withToken: boolean = false) {
        const response = await fetch(this.baseUrl + url, {
            method: 'PUT',
            headers: this.getHeaders(withToken),
            body: JSON.stringify(data)
        });

        const json = await response.json();

        if (!response.ok) {
            throw json;
        }

        return json as T;
    }

    static async delete<T>(url: string, withToken: boolean = false) {
        const response = await fetch(this.baseUrl + url, {
            method: 'DELETE',
            headers: this.getHeaders(withToken)
        });

        const json = await response.json();

        if (!response.ok) {
            throw json;
        }

        return json as T;
    }
}