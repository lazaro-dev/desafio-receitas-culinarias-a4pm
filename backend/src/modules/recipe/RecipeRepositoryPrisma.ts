import { RecipeRepository } from "@/modules/recipe/RecipeRepository";
import { PrismaClient } from "@prisma/client";
import { RecipeMapper } from "@/modules/recipe/mapper/RecipeMapper";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { UpdateRecipeDTO } from "@/modules/recipe/dto/UpdateRecipeDTO";
import { SearchRecipeDTO } from "@/modules/recipe/dto/SearchRecipeDTO";
import { PaginateResponseRecipeDTO } from "@/modules/recipe/dto/PaginateResponseRecipeDTO";
import { Recipe } from "@/modules/recipe/entity/Recipe";
import { User } from "@/modules/user/entity/User";

export class RecipeRepositoryPrisma implements RecipeRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async findById(id: number, userId: number): Promise<Recipe | null> {
        const recipe = await this.prisma.recipe.findUnique({ where: { id, id_usuarios: userId } });

        if (!recipe) return null;

        return RecipeMapper.toDomain(recipe);
    }

    async search(dto: SearchRecipeDTO, userId: number): Promise<PaginateResponseRecipeDTO> {
        const perPage = dto.per_page ? parseInt(dto.per_page) : 15;
        const page = dto.page ? parseInt(dto.page) : 1;
        const skipCalc = page ? (page - 1) * perPage : 0;
        const total = await this.prisma.recipe.count();
        const searchContent = dto.search ? dto.search : undefined;

        const recipes = await this.prisma.recipe.findMany({
            where: {
                id_usuarios: userId,
                modo_preparo: {
                    contains: searchContent,
                },
                nome: {
                    contains: searchContent
                },
                ingredientes: {
                    contains: searchContent
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
            per_page: perPage,
            total: total
        };
    }

    async create(dto: CreateRecipeDTO, userId: number): Promise<Recipe> {
        const recipe = await this.prisma.recipe.create({
            data: {
                modo_preparo: dto.modo_preparo,
                id_usuarios: userId,
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

    async update(dto: UpdateRecipeDTO, userId: number): Promise<Recipe> {
        const recipe = await this.prisma.recipe.update({
            where: { id: dto.id, id_usuarios: userId },
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

    async delete(id: number, userId: number): Promise<void> {
        await this.prisma.recipe.delete({ where: { id, id_usuarios: userId } });
    }
}