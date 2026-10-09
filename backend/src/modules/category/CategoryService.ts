import CategoryRepository from "./CategoryRepository";
import { Category } from "./entity/Category";

export class CategoryService {
    constructor(
        private categoryRepository: CategoryRepository
    ) {}

    async getAll(): Promise<Category[]> {
        return this.categoryRepository.getAll();
    }
}