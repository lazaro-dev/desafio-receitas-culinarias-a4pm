import { Category } from "@/modules/category/entity/Category";

export default interface CategoryRepository {
    getAll(): Promise<Category[]>;
    findById(id: number): Promise<Category | null>;
}