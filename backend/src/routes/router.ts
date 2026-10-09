import { HttpError } from "@/errors/HttpError";
import { authControllerFactory } from "@/modules/auth/AuthFactory";
import { categoryControllerFactory } from "@/modules/category/CategoryFactory";
import express, { type NextFunction, type Request, type Response } from "express";
import { handle as handleAuth } from "@/middlewares/AuthMidleware";
import { handle as handleValidator, ValidatorTarget } from "@/middlewares/ValidatorMiddleware";
import { RegisterValidator } from "@/modules/auth/validator/RegisterValidator";
import { LoginValidator } from "@/modules/auth/validator/LoginValidator";
import { recipeControllerFactory } from "@/modules/recipe/RecipeFactory";
import { UpdateRecipeValidator } from "@/modules/recipe/validator/UpdateRecipeValidator";
import { CreateRecipeValidator } from "@/modules/recipe/validator/CreateRecipeValidator";
import { SearchRecipeValidator } from "@/modules/recipe/validator/SearchRecipeValidator";

const router = express.Router();

const categoryController = categoryControllerFactory();
const authController = authControllerFactory();
const recipeController = recipeControllerFactory();

router.get("/categories", handleAuth(), (req, res) => categoryController.getAll(req, res));

router.post("/auth/register", handleValidator(RegisterValidator), (req, res) => authController.register(req, res));
router.post("/auth/login", handleValidator(LoginValidator), (req, res) => authController.login(req, res));


router.get("/recipes", handleAuth(), handleValidator(SearchRecipeValidator, ValidatorTarget.query), (req, res) => recipeController.search(req, res));
router.post("/recipes", handleAuth(), handleValidator(CreateRecipeValidator), (req, res) => recipeController.create(req, res));
router.put("/recipes/:id", handleAuth(), handleValidator(UpdateRecipeValidator), (req, res) => recipeController.update(req, res));
router.delete("/recipes/:id", handleAuth(), (req, res) => recipeController.delete(req, res));


router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }

    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            message: err.message,
        });
    }

    return res.status(500).json({
        message: "Erro interno do servidor.",
    });
});


export default router;