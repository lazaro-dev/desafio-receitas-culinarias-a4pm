import { PrismaClientService } from "@/database/PrismaClient";
import { UserRepositoryPrisma } from "@/modules/user/UserRepositoryPrisma";
import { AuthController } from "@/modules/auth/AuthController";
import { AuthService } from "@/modules/auth/AuthService";

export const authControllerFactory = (): AuthController => {
    const userRepository = new UserRepositoryPrisma(PrismaClientService);
    const authService = new AuthService(userRepository);
    const authController: AuthController = new AuthController(authService);

    return authController;
}