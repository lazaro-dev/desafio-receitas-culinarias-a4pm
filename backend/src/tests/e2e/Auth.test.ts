import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@/App';
import { UserRepositoryPrisma } from '@/modules/user/UserRepositoryPrisma';
import { PrismaClientService } from '@/database/PrismaClient';

// Login válido retorna token.

// Rota protegida sem token retorna 401.

// Token inválido ou expirado é rejeitado.

describe('Auth e2e', () => {

    it('Login válido', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        await userRepository.create({
            login: 'login_e2e_correct',
            senha: 'senha1',
            criado_em: new Date(),
            alterado_em: new Date()
        })

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                login: 'login_e2e_correct',
                senha: 'senha1'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toHaveProperty('login');
        expect(response.body.user.login).toBe('login_e2e_correct');
    });

    it('Campo login incorreto', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        await userRepository.create({
            login: 'login_e2e',
            senha: 'senha1',
            criado_em: new Date(),
            alterado_em: new Date()
        })

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                login: 'login_e2e_incorrect',
                senha: 'senha1'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Usuário ou senha incorreta.');
    });


    it('Senha incorreta', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        await userRepository.create({
            login: 'login_e2e_senha_incorreta',
            senha: 'senha12',
            criado_em: new Date(),
            alterado_em: new Date()
        })

        const response = await request(app)
            .post('/api/v1/auth/login')
            .send({
                login: 'login_e2e_senha_incorreta',
                senha: 'senha1'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Usuário ou senha incorreta.');
    });

    it('Token inválido', async () => {
        const response = await request(app)
            .get('/api/v1/categories')
            .set('Authorization', 'Bearer token_invalido');

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Token Inválido');
    })


    it('Token expirado', async () => {
        const tokenExpired = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3OTE2MzkwNDYsImV4cCI6MTc5MTY0MjY0Niwic3ViIjoiMiJ9.wuVyIbsa_c5uUQDK5ZqIqw9sF9rQrujDagv1iWYF1H8';
        const response = await request(app)
            .get('/api/v1/categories')
            .set('Authorization', `Bearer ${tokenExpired}`);

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Token Inválido');
    })
});