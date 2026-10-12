import { HttpService } from "@/services/http.service";
import { CategoryMapper } from "@/services/mappers/CategoryMapper";
import type { CategoryApiDTO } from "./dtos/category.dto";
import type { Category } from "@/entities/category";

export class CategoryService {
    static async getAll(): Promise<Category[]> {

        const response = await HttpService.get<CategoryApiDTO[]>('/categories', true);

        return response.map(CategoryMapper.toDomain);
    }
}
