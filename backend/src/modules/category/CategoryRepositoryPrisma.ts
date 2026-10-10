import CategoryRepository from "@/modules/category/CategoryRepository";
import { Category } from "@/modules/category/entity/Category";
import { PrismaClient, Category as PrismaCategory } from "@prisma/client";
import { CategoryMapper } from "./mapper/CategoryMapper";

export class CategoryRepositoryPrisma implements CategoryRepository {

    constructor(private readonly prisma: PrismaClient) { }

    async getAll(): Promise<Category[]> {
        const categories: PrismaCategory[] = await this.prisma.category.findMany();
        return categories.map(CategoryMapper.toDomain);
    }

    async findById(id: number): Promise<Category | null> {
        const category: PrismaCategory | null = await this.prisma.category.findUnique({ where: { id } });

        if (!category) return null;

        return CategoryMapper.toDomain(category);
    }
}