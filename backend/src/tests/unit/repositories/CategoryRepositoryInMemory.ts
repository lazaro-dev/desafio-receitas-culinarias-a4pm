import CategoryRepository from '@/modules/category/CategoryRepository';
import { Category } from '@/modules/category/entity/Category';

export class CategoryRepositoryInMemory implements CategoryRepository {
    private items: Category[] = [
        {
            "id": 1,
            "nome": "Bolos e tortas doces"
        },
        {
            "id": 3,
            "nome": "Aves",
        },
    ];

    async getAll(): Promise<Category[]> {
        return this.items;
    }

    async findById(id: number): Promise<Category | null> {
        return this.items.find(item => item.id === id) || null;
    }
}