import env from '@/config/env';
import { sign, verify } from 'jsonwebtoken'

export class TokenJWTUtil {
    static getUserId(accessToken: string): string {
        const { sub: userId } = verify(accessToken, env.JWT_SECRET);

        return userId as string
    }

    
    static generateToken(userId: number): string {
        const expiresInSeconds = 3600;
        const privateKey = env.JWT_SECRET ?? '';
        return sign({}, privateKey, {
            subject: userId.toString(),
            expiresIn: expiresInSeconds,
        })
    }
}