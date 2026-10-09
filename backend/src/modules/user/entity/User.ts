export class User {
    constructor(
         public readonly id: number,
         public readonly login: string,
         public readonly senha: string,
         public readonly criado_em: Date,
         public readonly alterado_em: Date,
         public readonly nome?: string | null,
    ) {
    }
}