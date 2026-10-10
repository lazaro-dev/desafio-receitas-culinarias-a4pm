import { RecipeService } from "@/modules/recipe/RecipeService";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { Recipe } from "@/modules/recipe/entity/Recipe";
import { CategoryRepositoryPrisma } from "@/modules/category/CategoryRepositoryPrisma";
import { PrismaClientService } from "@/database/PrismaClient";
import { RecipeRepositoryPrisma } from "@/modules/recipe/RecipeRepositoryPrisma";
import { UserRepositoryPrisma } from "@/modules/user/UserRepositoryPrisma";
import { SearchRecipeDTO } from "@/modules/recipe/dto/SearchRecipeDTO";


describe('RecipeService', () => {
    it('Criar receita com dados persistentes validos', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        const categoryRepository = new CategoryRepositoryPrisma(PrismaClientService);
        const recipeRepository = new RecipeRepositoryPrisma(PrismaClientService);
        const recipeService = new RecipeService(recipeRepository, categoryRepository);

        const user = await userRepository.create({
            login: 'login_valid_recipe',
            senha: 'senha1',
            criado_em: new Date(),
            alterado_em: new Date()
        })

        const data: CreateRecipeDTO = {
            modo_preparo: 'Modo de preparo',
            id_usuarios: user.id,
            id_categorias: 1,
            nome: 'Receita 1',
            ingredientes: 'Ingredientes',
            tempo_preparo_minutos: 30,
            porcoes: 4
        }

        const result = await recipeService.create(data);
        const recipe = await recipeRepository.findById(result.id);

        expect(recipe).instanceOf(Recipe);
        expect(recipe).toMatchObject(data);
    })

    it('Aplica os filtros corretamente', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        const categoryRepository = new CategoryRepositoryPrisma(PrismaClientService);
        const recipeRepository = new RecipeRepositoryPrisma(PrismaClientService);
        const recipeService = new RecipeService(recipeRepository, categoryRepository);

        const user = await userRepository.create({
            login: 'filter_valid_recipe',
            senha: 'senha',
            criado_em: new Date(),
            alterado_em: new Date()
        })

        const recipe = await recipeRepository.create({
            modo_preparo: 'Modo de preparo',
            id_usuarios: user.id,
            id_categorias: null,
            nome: 'Receita 1',
            ingredientes: 'Ingredientes',
            tempo_preparo_minutos: 30,
            porcoes: 4
        })

        const data: SearchRecipeDTO = {
            page: '1',
            per_page: '3',
            modo_preparo: recipe.modo_preparo,
            id_categorias: recipe.id_categorias,
            nome: recipe.nome,
            tempo_preparo_minutos: recipe.tempo_preparo_minutos,
            porcoes: recipe.porcoes,
            ingredientes: recipe.ingredientes
        }

        const result = await recipeService.search(data);

        expect(result.data).toHaveLength(1);
        expect(result.page).toBe(1);
        expect(result.per_page).toBe(3);
        expect(result.data?.[0]).toMatchObject({
            modo_preparo: data.modo_preparo,
            id_categorias: data.id_categorias,
            nome: data.nome,
            tempo_preparo_minutos: data.tempo_preparo_minutos,
            porcoes: data.porcoes,
            ingredientes: data.ingredientes
        });
    })

})