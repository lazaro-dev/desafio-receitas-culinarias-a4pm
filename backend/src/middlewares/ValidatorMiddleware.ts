import { type NextFunction, type Request, type Response } from "express";

export enum ValidatorTarget {
    body = 'body',
    query = 'query'
}

export function handle(schema: any, validatorTarget: ValidatorTarget = ValidatorTarget.body) {
    return async function
        (req: Request, res: Response, next: NextFunction) {

        const data = validatorTarget === 'body' ? req.body : req.query;

        const result = schema.safeParse(data);

        if (result && !result.success) {
            return res.status(422).json({
                message: result.error.issues.map((issue: any) => ({
                    field: issue?.path?.[0] || '',
                    message: issue?.message,
                })),
            });
        }

        req.body = result.data;

        return next();
    }
}