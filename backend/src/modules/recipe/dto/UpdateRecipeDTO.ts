export interface UpdateRecipeDTO 
{
    id: number;
    modo_preparo: string;
    nome?: string | null;
    id_categorias?: number | null;
    tempo_preparo_minutos?: number | null;
    porcoes?: number | null;
    ingredientes?: string | null;
}
