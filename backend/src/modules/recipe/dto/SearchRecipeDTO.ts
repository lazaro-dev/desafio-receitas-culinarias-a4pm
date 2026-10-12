export interface SearchRecipeDTO {
    page?: string;
    per_page?: string;
    search?: string;
    id_categorias?: number | null;
    tempo_preparo_minutos?: number | null;
    porcoes?: number | null;
}    