import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { FilterOption, KanbanPageDataRequest, KanbanPageDataResponse, MenuFilterListRequest, MenuFilterListResponse, MenuPageFiltersRequest } from './models/helperModel';
import api from './apiService';

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



export const menuService = {

    async getMenuFilterList(req: MenuFilterListRequest): Promise<MenuFilterListResponse> {
        const response = await api.post<MenuFilterListResponse>('/helper/menu-filter-list', req);
        return response.data;
    },

    async getMenuPageFilters(req: MenuPageFiltersRequest): Promise<FilterOption[]> {
        const response = await api.post<FilterOption[]>('/helper/menu-page-filters', req);
        return response.data;
    },

    async getKanbanPageData(req: KanbanPageDataRequest): Promise<KanbanPageDataResponse[]> {
        const response = await api.post<KanbanPageDataResponse[]>('/helper/kanban-page-data', req);
        return response.data;
    },


}