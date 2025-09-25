# TaskGo Admin

Este é o painel administrativo do TaskGo, uma aplicação para gerenciamento de tarefas construída com Next.js 13+, TypeScript, e Tailwind CSS.

## Tecnologias

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Radix UI
- Server Actions
- JWT Authentication
- Vercel Postgres
- TanStack Table
- Recharts
- Date-fns

## Requisitos

- Node.js 16+
- PostgreSQL

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.local.example` para `.env.local`
- Preencha as variáveis:
  - `JWT_SECRET`: chave secreta para geração dos tokens JWT
  - `POSTGRES_URL`: URL de conexão com o banco PostgreSQL

4. Execute as migrações do banco de dados:
```sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP
);
```

## Desenvolvimento

```bash
npm run dev
```

## Produção

```bash
npm run build
npm start
```

## Estrutura do Projeto

```
src/
  ├── app/               # Rotas e páginas
  │   ├── admin/        # Área administrativa
  │   └── login/        # Autenticação
  ├── components/       # Componentes React
  │   ├── layout/      # Layouts
  │   └── ui/          # Componentes de UI
  └── lib/             # Utilitários
```

## Funcionalidades

- Autenticação JWT
- Dashboard com estatísticas
- Gerenciamento de tarefas (CRUD)
- Interface responsiva
- Gráficos e tabelas interativas
