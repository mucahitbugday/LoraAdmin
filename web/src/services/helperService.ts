import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const COOKIE_OPTIONS = {
    sameSite: 'strict' as const,
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/'
};

export const cookieService = {
    setAccessToken(token: string) {
        setCookie('access_token', token, COOKIE_OPTIONS);
    },

    getAccessToken(): string | undefined {
        return getCookie('access_token') as string | undefined;
    },

    removeAccessToken() {
        deleteCookie('access_token');
    },

    setRefreshToken(token: string) {
        setCookie('refresh_token', token, COOKIE_OPTIONS);
    },

    getRefreshToken(): string | undefined {
        return getCookie('refresh_token') as string | undefined;
    },

    removeRefreshToken() {
        deleteCookie('refresh_token');
    },

    setUserData(userData: any) {
        setCookie('user_data', JSON.stringify(userData), COOKIE_OPTIONS);
    },

    getUserData(): any {
        const data = getCookie('user_data');
        return data ? JSON.parse(data as string) : null;
    },

    removeUserData() {
        deleteCookie('user_data');
    },

    clearAll() {
        this.removeAccessToken();
        this.removeRefreshToken();
        this.removeUserData();
    }
}; 