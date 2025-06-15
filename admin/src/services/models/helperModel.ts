export interface MenuFilterListResponse {
    pageData: any[];
    totalCount: number;
}

export interface MenuFilterListRequest {
    MenuPath: string;
    Filters: { key: string; value: any }[];
    orderBy: string;
    pageNumber: number;
    pageLimit: number | null;
}

export interface MenuPageFiltersRequest {
    MenuPath: string;
}

export interface KanbanPageDataRequest {
    MenuPath: string;
}

export interface KanbanPageDataResponse {
    ColumnID: string;
    ColumnName: string;
    ColumnDescription: string;
    ColumnStatus: string;
    Tasks: KanbanTask[];
}

export interface KanbanTask {
    TaskID: string;
    TaskName: string;
    TaskDescription: string;
    TaskStatus: string;
}

export interface FilterOption {
    field: string;
    label: string;
    type: 'text' | 'select' | 'date' | 'number';
    options?: { label: string; value: any }[];
}