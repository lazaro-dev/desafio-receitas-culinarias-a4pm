import type { Recipe } from "@/entities/recipe";
import type { CategoryApiDTO } from "./category.dto";

export interface SearchRecipeDTO {
    page?: string;
    per_page?: string;
    id_categorias?: number | null;
    search?: string | null;
    tempo_preparo_minutos?: number | null;
    porcoes?: number | null;
}

export interface RecipeApiDTO {
    id: number;
    modo_preparo: string;
    id_usuarios: number;
    id_categorias: number | null;
    nome: string | null;
    ingredientes: string | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
    criado_em: string;
    alterado_em: string;
    categoria: CategoryApiDTO | null;
}

export interface PaginateResponseRecipeDTO {
    page: number;
    per_page: number;
    total: number;
    data: Recipe[];
}

export interface CreateRecipeDTO {
    modo_preparo: string;
    id_categorias: number | null;
    nome: string | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
    ingredientes: string | null;
}

export interface UpdateRecipeDTO {
    id_usuarios: number;
    modo_preparo: string;
    id_categorias: number | null;
    nome: string | null;
    tempo_preparo_minutos: number | null;
    porcoes: number | null;
    ingredientes: string | null;
}