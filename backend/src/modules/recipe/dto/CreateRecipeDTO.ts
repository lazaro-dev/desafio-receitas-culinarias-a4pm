export interface CreateRecipeDTO {
    id_usuarios: number;
    modo_preparo: string;
    id_categorias: number | null;
    nome: string | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
    ingredientes: string | null;
}    