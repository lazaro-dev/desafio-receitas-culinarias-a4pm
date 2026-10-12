import { RecipeService } from "@/modules/recipe/RecipeService";
import { RecipeRepositoryInMemory } from "../../repositories/RecipeRepositoryInMemory";
import { CategoryRepositoryInMemory } from "../../repositories/CategoryRepositoryInMemory";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { Recipe } from "@/modules/recipe/entity/Recipe";
import { UpdateRecipeDTO } from "@/modules/recipe/dto/UpdateRecipeDTO";


describe('RecipeService', () => {
    it('Criar receita válida', async () => {
        const categoryRepository = new CategoryRepositoryInMemory();
        const recipeRepository = new RecipeRepositoryInMemory();
        const recipeService = new RecipeService(recipeRepository, categoryRepository);

        const data: CreateRecipeDTO = {
            modo_preparo: 'Modo de preparo',
            id_categorias: 1,
            nome: 'Receita 1',
            ingredientes: 'Ingredientes',
            tempo_preparo_minutos: 30,
            porcoes: 4
        }

        const result = await recipeService.create(data, 1);

        expect(result).instanceOf(Recipe);
        expect(result).toMatchObject(data);
    })

    it('Atualizar receita inexistente', async () => {
        const categoryRepository = new CategoryRepositoryInMemory();
        const recipeRepository = new RecipeRepositoryInMemory();
        const recipeService = new RecipeService(recipeRepository, categoryRepository);

        const userId = 1;
        const data: UpdateRecipeDTO = {
            id: 1,
            modo_preparo: 'Modo de preparo',
            id_categorias: 1,
            nome: 'Receita 1',
            ingredientes: 'Ingredientes',
            tempo_preparo_minutos: 30,
            porcoes: 4
        }

        await expect(recipeService.update(data, userId)).rejects.toThrow('Receita não encontrada.');
    })

    it('Usuário tenta modificar receita de outro usuário', async () => {
        const categoryRepository = new CategoryRepositoryInMemory();
        const recipeRepository = new RecipeRepositoryInMemory();
        const recipeService = new RecipeService(recipeRepository, categoryRepository);

        const data = {
            modo_preparo: 'Modo de preparo',
            id_usuarios: 1,
            id_categorias: 1,
            nome: 'Receita 1',
            ingredientes: 'Ingredientes',
            tempo_preparo_minutos: 30,
            porcoes: 4,
            criado_em: new Date(),
            alterado_em: new Date()
        };

        const recipe = await recipeRepository.create(data);

        
        const userIdWithoutPermission = 2;
        const dataUpdate: UpdateRecipeDTO = {
            id: recipe.id,
            modo_preparo: 'Modo de preparo',
            id_categorias: 1,
            nome: 'Receita 1',
            ingredientes: 'Ingredientes',
            tempo_preparo_minutos: 30,
            porcoes: 4
        }

        await expect(recipeService.update(dataUpdate, userIdWithoutPermission)).rejects.toThrow('Receita não pertence ao usuário.');
    })
})