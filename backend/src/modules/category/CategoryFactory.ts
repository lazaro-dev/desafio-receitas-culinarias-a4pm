import { PrismaClientService } from "@/database/PrismaClient";
import { CategoryController } from "@/modules/category/CategoryController";
import { CategoryService } from "./CategoryService";
import { CategoryRepositoryPrisma } from "./CategoryRepositoryPrisma";

export const categoryControllerFactory = (): CategoryController => {
    const categoryRepository = new CategoryRepositoryPrisma(PrismaClientService);
    const categoryService = new CategoryService(categoryRepository);
    const categoryController: CategoryController = new CategoryController(categoryService);

    return categoryController;
}