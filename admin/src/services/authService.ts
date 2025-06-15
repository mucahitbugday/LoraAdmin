import api from './apiService';
import { cookieService } from './helperService';
import { AuthResponse, ConfirmEmailRequest, ConfirmEmailResponse, LoginRequest, RegisterRequest } from './models/authModel';

export const authService = {
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/login', credentials);
        const { accessToken, refreshToken, user } = response.data;

        if (accessToken && refreshToken) {
            cookieService.setUserData(user);
            cookieService.setAccessToken(accessToken);
            cookieService.setRefreshToken(refreshToken);
        }
        return response.data;
    },

    async refreshToken(): Promise<AuthResponse> {
        const refreshToken = cookieService.getRefreshToken();
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const response = await api.post<AuthResponse>('/auth/refresh-token', { refreshToken });
        const { accessToken, refreshToken: newRefreshToken, user } = response.data;

        cookieService.setUserData(user);
        cookieService.setAccessToken(accessToken);
        cookieService.setRefreshToken(newRefreshToken);

        return response.data;
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    async confirmEmail(data: ConfirmEmailRequest): Promise<ConfirmEmailResponse> {
        const response = await api.post<ConfirmEmailResponse>('/auth/mailConfirm', data);
        return response.data;
    },

    logout() {
        cookieService.clearAll();
    },

    getAccessToken(): string | null {
        return cookieService.getAccessToken() ?? null;
    },

    getRefreshToken(): string | null {
        return cookieService.getRefreshToken() ?? null;
    },

    getUser() {
        return cookieService.getUserData();
    },

    isAuthenticated(): boolean {
        return !!cookieService.getAccessToken();
    }
}; 