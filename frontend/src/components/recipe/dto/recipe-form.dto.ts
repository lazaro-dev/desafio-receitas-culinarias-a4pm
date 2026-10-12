export interface RecipeFormFilter {
    page: string;
    per_page: string;
    search: string;
    id_categorias: number | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
}

export interface SaveRecipe {
    modo_preparo: string;
    id_categorias: number | null;
    nome: string | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
    ingredientes: string | null;
}
