interface FilterField {
    name: string;
    label: string;
}

export interface PageDataResponse<T = any> {
    page: number;
    pageLimit: number;
    pageTodalCount: number;
    pageTitle: string;
    orderBy?: string;
    butons?: { label: string; icon: string; action: string }[];
    data: T[];
    filterFields: FilterField[];
}

export interface PageDataRequest {
    page: number;
    pathname: string;
    orderBy?: string;
    sortDirection?: 'asc' | 'desc';
    pageLimit: number;
    search?: string;
    filterFields: { name: string; value: string }[];
}