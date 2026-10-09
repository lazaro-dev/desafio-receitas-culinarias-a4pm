import { CategoryService } from "@/modules/category/CategoryService";

export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    async getAll(req: any, res: any) {
        try {
            const categories = await this.categoryService.getAll();
            return res.status(200).json(categories);
        }
        catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}