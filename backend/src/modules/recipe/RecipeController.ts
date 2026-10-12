import { RecipeService } from "@/modules/recipe/RecipeService";
import { CreateRecipeDTO } from "@/modules/recipe/dto/CreateRecipeDTO";
import { UpdateRecipeDTO } from "@/modules/recipe/dto/UpdateRecipeDTO";
import { SearchRecipeDTO } from "@/modules/recipe/dto/SearchRecipeDTO";

export class RecipeController {
    constructor(private readonly recipeService: RecipeService) { }

    async search(req: any, res: any) {
        const dto: SearchRecipeDTO = {
            page: req.query.page,
            per_page: req.query.per_page,
            search: req.query.search,
            id_categorias: req.query.id_categorias ? parseInt(req.query.id_categorias) : undefined,
            tempo_preparo_minutos: req.query.tempo_preparo_minutos ? parseInt(req.query.tempo_preparo_minutos) : undefined,
            porcoes: req.query.porcoes ? parseInt(req.query.porcoes) : undefined,
        }

        const result = await this.recipeService.search(dto, req.user.id);

        return res.status(200).json(result);
    }

    async create(req: any, res: any) {
        const dto: CreateRecipeDTO = {
            modo_preparo: req.body.modo_preparo,
            id_categorias: req.body.id_categorias,
            nome: req.body.nome,
            ingredientes: req.body.ingredientes,
            tempo_preparo_minutos: req.body.tempo_preparo_minutos,
            porcoes: req.body.porcoes
        };

        const result = await this.recipeService.create(dto, req.user.id);

        return res.status(201).json(result);
    }

    async update(req: any, res: any) {
        const dto: UpdateRecipeDTO = {
            id: Number(req.params.id) || 0,
            modo_preparo: req.body.modo_preparo,
            id_categorias: req.body.id_categorias,
            nome: req.body.nome,
            ingredientes: req.body.ingredientes,
            tempo_preparo_minutos: req.body.tempo_preparo_minutos,
            porcoes: req.body.porcoes
        };

        const result = await this.recipeService.update(dto, req.user.id);

        return res.status(200).json(result);
    }

    async delete(req: any, res: any) {
        const result = await this.recipeService.delete(Number(req.params.id) || 0, req.user.id);

        return res.status(204).json();
    }
}