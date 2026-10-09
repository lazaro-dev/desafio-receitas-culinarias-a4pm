import { RecipeRepository } from "@/modules/recipe/RecipeRepository";
import { PrismaClient } from "@prisma/client";
import { RecipeMapper } from "@/modules/recipe/mapper/RecipeMapper";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { UpdateRecipeDTO } from "@/modules/recipe/dto/UpdateRecipeDTO";
import { SearchRecipeDTO } from "@/modules/recipe/dto/SearchRecipeDTO";
import { PaginateResponseRecipeDTO } from "@/modules/recipe/dto/PaginateResponseRecipeDTO";
import { Recipe } from "@/modules/recipe/entity/Recipe";

export class RecipeRepositoryPrisma implements RecipeRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async findById(id: number): Promise<Recipe | null> {
        const recipe = await this.prisma.recipe.findUnique({ where: { id } });

        if (!recipe) return null;

        return RecipeMapper.toDomain(recipe);
    }

    async search(dto: SearchRecipeDTO): Promise<PaginateResponseRecipeDTO> {
        const perPage = dto.per_page ? parseInt(dto.per_page) : 15;
        const page = dto.page ? parseInt(dto.page) : 1;
        const skipCalc = page ? (page - 1) * perPage : 0;

        const recipes = await this.prisma.recipe.findMany({
            where: {
                modo_preparo: {
                    contains: dto.modo_preparo ? dto.modo_preparo : undefined,
                },
                nome: {
                    contains: dto.nome ? dto.nome : undefined
                },
                ingredientes: {
                    contains: dto.ingredientes ? dto.ingredientes : undefined
                },
                id_categorias: dto.id_categorias ? dto.id_categorias : undefined,
                tempo_preparo_minutos: dto.tempo_preparo_minutos ? dto.tempo_preparo_minutos : undefined,
                porcoes: dto.porcoes ? dto.porcoes : undefined
            },
            orderBy: {
                criado_em: "desc"
            },
            skip: skipCalc,
            take: perPage,
        });

        return {
            data: recipes.map(RecipeMapper.toDomain),
            page: page,
            per_page: perPage
        };
    }

    async create(dto: CreateRecipeDTO): Promise<Recipe> {
        const recipe = await this.prisma.recipe.create({
            data: {
                modo_preparo: dto.modo_preparo,
                id_usuarios: dto.id_usuarios,
                id_categorias: dto.id_categorias,
                nome: dto.nome,
                ingredientes: dto.ingredientes,
                tempo_preparo_minutos: dto.tempo_preparo_minutos,
                porcoes: dto.porcoes,
                criado_em: new Date(),
                alterado_em: new Date()
            }
        });

        return RecipeMapper.toDomain(recipe);
    }

    async update(dto: UpdateRecipeDTO): Promise<Recipe> {
        const recipe = await this.prisma.recipe.update({
            where: { id: dto.id },
            data: {
                modo_preparo: dto.modo_preparo,
                id_categorias: dto.id_categorias,
                nome: dto.nome,
                ingredientes: dto.ingredientes,
                tempo_preparo_minutos: dto.tempo_preparo_minutos,
                porcoes: dto.porcoes,
                alterado_em: new Date()
            }
        });

        return RecipeMapper.toDomain(recipe);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.recipe.delete({ where: { id } });
    }
}