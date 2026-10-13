# Desafio Receitas Culinárias A4PM

## Objetivo
O desafio consiste em implementar o máximo de funcionalidades descritas abaixo e enviar o projeto dentro do prazo estabelecido pela empresa.

#Funcionalidades

Cadastro de usuário no sistema.
Login de usuário.
Logoff de usuário.
Cadastro de receitas pelo usuário.
Pesquisa de receitas cadastradas pelo usuário.
Edição de uma receita.
Exclusão de uma receita.
Impressão de uma receita.


## Banco de Dados
Nos arquivos enviados, há uma pasta chamada banco, que contém detalhes sobre a modelagem do banco de dados e scripts SQL para sua criação.

## Restrições

Desenvolvedor Web - Full Stack / Tech Lead

Utilize Node.js com TypeScript para construir uma API RESTful no backend.
No frontend, utilize Vue.js para criar a interface que se comunicará com o backend.
O banco de dados deve ser MySQL.
Inclua um guia detalhado explicando como rodar o sistema.

Diferenciais: Documentação de API (Swagger), uso de Docker e implementação de testes unitários e de integração (E2E).
Para nível Tech Lead, esses itens são obrigatórios.

## Como executar o projeto

### Pré-requisitos
- Docker
- Docker Compose

## Inicialização do ambiente

### 1. Subir infraestrutura completa (Linux, Git Bash ou WSL)
Na raiz do projeto onde se encontra o dev.sh e o docker-compose.dev.yml execute no terminal:

### UP
```bash
./dev.sh -u
```

### DOWN
```bash
./dev.sh -u
```

### BUILD
```bash
./dev.sh -b nome-container
```

### BUILD ALL
```bash
./dev.sh -b-all
```

### 2. Acessar a aplicação

```text
http://localhost:5173
```

## Documentação (Swagger)

```text
http://localhost:8080/api/v1/docs
```