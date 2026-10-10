import { PrismaClientService } from "@/database/PrismaClient";

beforeEach(async () => {
    await PrismaClientService.recipe.deleteMany();
    await PrismaClientService.user.deleteMany();
});

afterAll(async () => {
    await PrismaClientService.$disconnect();
});