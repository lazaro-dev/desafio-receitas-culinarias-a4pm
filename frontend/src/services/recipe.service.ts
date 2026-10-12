import type { AuthResponseDTO, CredentialsDTO, RegisterCredentialsDTO } from "@/services/dtos/auth.dto";
import { HttpService } from "@/services/http.service";
import type { CreateRecipeDTO, RecipeApiDTO, SearchRecipeDTO, UpdateRecipeDTO } from "@/services/dtos/recipe.dto";
import { RecipeMapper } from "@/services/mappers/RecipeMapper";
import type { PaginationDTO } from "@/services/dtos/pagination.dto";


export class RecipeService {
    static async search(params: SearchRecipeDTO): Promise<PaginationDTO<RecipeApiDTO>> {
        let urlParams = `?page=${params.page}&per_page=${params.per_page}`;

        if (params.search) {
            urlParams += `&search=${params.search}`;
        }

        if (params.id_categorias) {
            urlParams += `&id_categorias=${params.id_categorias}`;
        }

        if (params.tempo_preparo_minutos) {
            urlParams += `&tempo_preparo_minutos=${params.tempo_preparo_minutos}`;
        }

        if (params.porcoes) {
            urlParams += `&porcoes=${params.porcoes}`;
        }

        const response: PaginationDTO<RecipeApiDTO> = await HttpService.get('/recipes' + urlParams, true);

        return {
            per_page: response.per_page,
            page: response.page,
            data: response.data.map(RecipeMapper.toDomain),
        } as PaginationDTO<RecipeApiDTO>;
    }

    static async create(dto: CreateRecipeDTO) {
        const response = await HttpService.post<RecipeApiDTO>('/recipes', dto, true);

        return RecipeMapper.toDomain(response);
    }

    static async update(dto: UpdateRecipeDTO, id: number) {
        const response = await HttpService.put<RecipeApiDTO>('/recipes' + id, dto, true);

        return RecipeMapper.toDomain(response);
    }

    static async delete(id: number) {
        const response = await HttpService.delete<RecipeApiDTO>('/recipes/' + id, true);

        return RecipeMapper.toDomain(response);
    }
}
