import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '@/App';
import { UserRepositoryPrisma } from '@/modules/user/UserRepositoryPrisma';
import { PrismaClientService } from '@/database/PrismaClient';

describe('Recipes e2e', () => {
    
    // Criar receita sem nome ou com dados obrigatórios ausentes.

    // Enviar valores inválidos, como tempo de preparo negativo, se a regra proíbe isso.

    // Verificar se a API retorna o status HTTP e o formato de erro esperados.


    it('', async () => {
        
    });

    
});