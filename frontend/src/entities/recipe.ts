export interface Recipe {
    id: number,
    modo_preparo: string,
    id_usuarios: number,
    id_categorias: number | null,
    nome: string | null,
    ingredientes: string | null,
    tempo_preparo_minutos: number | null,
    porcoes: number | null,
    criado_em: string,
    alterado_em: string
}