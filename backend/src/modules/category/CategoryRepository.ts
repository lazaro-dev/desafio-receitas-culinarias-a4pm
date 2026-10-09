import { Category } from "@/modules/category/entity/Category";

export default interface CategoryRepository {
    getAll(): Promise<Category[]>;
}