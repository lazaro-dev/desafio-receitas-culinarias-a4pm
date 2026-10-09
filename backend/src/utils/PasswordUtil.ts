import { compare, hashSync } from "bcrypt";

export class PasswordUtil {
    static hash(password: string): string {
        return hashSync(password, 6);
    }

    static async compare(password: string, passwordHash: string) {
        const result: boolean = await compare(password, passwordHash);

        return result;
    }
}