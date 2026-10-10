import { TokenJWTUtil } from "@/utils/TokenJWTUtil";
import { type NextFunction, type Request, type Response } from "express";

export function handle() {
    return async function
        (req: Request, res: Response, next: NextFunction) {

        try {
            const accessToken: string = req.headers.authorization?.split(' ')?.[1] ?? '';

            if (accessToken) {
                const userId = TokenJWTUtil.getUserId(accessToken);

                req.user = { id: Number(userId) };

                return next();
            }

            return res.status(401).json({ message: 'Não autenticado' });
        } catch (error: any) {
            console.log(error);
            return res.status(401).json({ message: 'Token Inválido' });
        }
    }
}