import { Category } from "@/modules/category/entity/Category";
import {  Category as PrismaCategory } from "@prisma/client";

export class CategoryMapper {
    static toDomain(data: PrismaCategory): Category {
        return new Category(data.id, data.nome as string);
    }
}