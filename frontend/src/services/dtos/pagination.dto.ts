export interface PaginationDTO<T> {
    page: number;
    per_page: number;
    data: T[];
}