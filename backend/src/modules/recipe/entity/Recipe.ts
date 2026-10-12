import { Category } from "@/modules/category/entity/Category";

export class Recipe {
    constructor(
        public readonly id: number,
        public readonly modo_preparo: string,
        public readonly id_usuarios: number,
        public readonly id_categorias: number | null,
        public readonly nome: string | null,
        public readonly ingredientes: string | null,
        public readonly tempo_preparo_minutos: number | null,
        public readonly porcoes: number | null,
        public readonly criado_em: Date,
        public readonly alterado_em: Date,
        public readonly categoria?: Category | null,
    ) {
    }
}