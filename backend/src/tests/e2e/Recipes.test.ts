import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@/App';
import { UserRepositoryPrisma } from '@/modules/user/UserRepositoryPrisma';
import { PrismaClientService } from '@/database/PrismaClient';
import { TokenJWTUtil } from '@/utils/TokenJWTUtil';

describe('Recipes e2e', () => {

    it('Criar receita sem modo de preparo deve retornar erro', async () => {
        const userRepository = new UserRepositoryPrisma(PrismaClientService);
        const user = await userRepository.create({
            login: 'recipe_e2e',
            senha: 'senha1',
            criado_em: new Date(),
            alterado_em: new Date()
        })

        const token = TokenJWTUtil.generateToken(user.id);

        const response = await request(app)
            .post('/api/v1/recipes')
            .set('Authorization', `Bearer ${token}`)
            .send({
                modo_preparo: '',
                id_categorias: 1,
                nome: 'Receita 1',
                ingredientes: 'Ingredientes',
                tempo_preparo_minutos: 30,
                porcoes: 4
            });

        expect(response.status).toBe(422);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toHaveLength(1);
        expect(response.body.message?.[0]).toHaveProperty('field');
        expect(response.body.message?.[0]?.field).toBe('modo_preparo');
    });


});