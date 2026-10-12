import type { Category } from "@/entities/category";
import type { CategoryApiDTO } from "@/services/dtos/category.dto";

export class CategoryMapper {
    static toDomain(data: CategoryApiDTO): Category {
        return {
            id: data.id,
            nome: data.nome ?? null,
        }
    }
}