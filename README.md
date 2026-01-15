# Teste Técnico Vituax

## 📋 Sumário

- [Sobre o Teste](#sobre-o-teste)
- [IMPORTANTE: Como Entregar o Teste](#️-importante-como-entregar-o-teste)
- [Objetivos](#objetivos)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Stack Tecnológica](#stack-tecnológica)
- [Configuração e Instalação](#configuração-e-instalação)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Estrutura de Portas](#estrutura-de-portas)
- [Conceitos Importantes](#conceitos-importantes)
- [Permissões de Usuários](#permissões-de-usuários)
- [Credenciais de Teste](#credenciais-de-teste)
- [Fluxo de Desenvolvimento (GitFlow)](#fluxo-de-desenvolvimento-gitflow)
- [Tarefas do Desafio](#tarefas-do-desafio)
  - [Configuração Inicial](#configuração-inicial)
  - [Autenticação e Autorização](#autenticação-e-autorização)
  - [Funcionalidades da Home Page](#funcionalidades-da-home-page)
  - [Criação de VM](#criação-de-vm)
  - [Gerenciamento de VMs (My VMs)](#gerenciamento-de-vms-my-vms)
  - [Cadastro de MSP](#cadastro-de-msp)
  - [Cadastro de Funcionários](#cadastro-de-funcionários)
  - [Configuração White Label](#configuração-white-label)
  - [Configuração de Perfil e Notificações](#configuração-de-perfil-e-notificações)
  - [Tarefas Opcionais/Diferenciais](#tarefas-opcionaisdiferenciais)
- [Referências Visuais](#referências-visuais)
- [Lembrete Final](#-lembrete-final)

---

## 🎯 Sobre o Teste

O objetivo deste teste técnico é avaliar sua habilidade em:

- **Seguir padrões já estabelecidos** no projeto
- **Pesquisar, compreender e aplicar** elementos existentes na arquitetura
- **Trabalhar com o código**, utilizando as bibliotecas e estruturas já implementadas

Você pode criar, instalar e utilizar outras bibliotecas, porém o **foco principal** deve ser trabalhar com o que já existe no projeto.

### 📚 Recomendações Importantes

1. **Entenda a arquitetura**: Gaste um tempo seguindo o fluxo do código, entendendo a localização dos componentes e como eles estão conectados.
2. **Explore o projeto**: Analise as funções, estilos e padrões já existentes antes de começar a implementar.
3. **Sinta-se livre para melhorar**: Você pode fazer melhorias e simplificações, desde que não fuja da proposta inicial.

---

## ⚠️ IMPORTANTE: Como Entregar o Teste

### 🔄 Fork do Repositório

**ATENÇÃO**: Você deve fazer um **fork** deste repositório para sua própria conta do GitHub.

#### Passos para começar:

1. **Faça o fork** deste repositório para sua conta pessoal do GitHub
2. **Clone o seu fork** (não o repositório original):
   ```bash
   git clone https://github.com/SEU-USUARIO/TestTecVix.git
   cd TestTecVix
   ```
3. Trabalhe no **seu repositório** seguindo o fluxo de desenvolvimento descrito neste README
4. Faça commits e pushes para o **seu repositório**

### ⚠️ ATENÇÃO: Pull Requests

> **🚨 IMPORTANTE**: Os Pull Requests devem ser feitos **APENAS NO SEU REPOSITÓRIO**, não no repositório da Vituax!

- ✅ **CORRETO**: Criar PRs de `feature/*` → `release` e `release` → `main` **no seu fork**
- ❌ **INCORRETO**: Criar PRs para o repositório original da Vituax

**Pull Requests externos para o repositório da Vituax serão automaticamente fechados pelo GitHub Actions.**

### 🔓 Repositório Público

> **📢 IMPORTANTE**: Seu repositório fork **DEVE SER PÚBLICO** para que a equipe da Vituax possa avaliar seu trabalho.

Certifique-se de que:
- [ ] Seu repositório está configurado como **público** (não privado)
- [ ] A equipe da Vituax consegue acessar o link sem necessidade de permissões especiais

### 📤 Entrega do Teste

Ao finalizar o teste, você deve:

1. ✅ Garantir que todo o código está commitado e enviado para o **seu repositório no GitHub**
2. ✅ Verificar se o README está atualizado com:
   - Suas principais modificações
   - As soluções que você desenvolveu
   - Credenciais de teste (se aplicável)
3. ✅ **Enviar o link do seu repositório no GitHub** para a equipe da Vituax

### 📋 Checklist de Entrega

Antes de enviar, certifique-se de que:

- [ ] O código está no **seu repositório pessoal** do GitHub
- [ ] O repositório está configurado como **público** (não privado)
- [ ] A branch `main` contém o projeto original
- [ ] A branch `release` contém todas as suas modificações
- [ ] Existe um Pull Request da `release` para a `main` **no seu repositório**
- [ ] O README está atualizado com suas modificações
- [ ] O projeto está funcionando corretamente
- [ ] As credenciais de teste estão documentadas

> **🎯 LEMBRE-SE**: O link que você enviará deve ser do formato:
> `https://github.com/SEU-USUARIO/TestTecVix`

---

## 🎯 Objetivos

Este teste avalia sua capacidade de:

- Compreender e seguir uma arquitetura existente
- Implementar funcionalidades seguindo padrões estabelecidos
- Trabalhar com autenticação e autorização (JWT)
- Desenvolver interfaces responsivas e funcionais
- Utilizar boas práticas de versionamento (GitFlow)
- Documentar adequadamente o projeto

---

## 🏗️ Arquitetura do Projeto

O projeto está dividido em três partes principais:

```
TestTecVix/
├── backend-node-vix-test/    # API REST em Node.js + Express + Prisma
├── frontend-react-vix-test/  # Interface em React + TypeScript + Material-UI
├── screenshots/              # Imagens de referência para as telas
└── README.md                 # Este arquivo
```

---

## 💻 Requisitos do Sistema

Antes de começar, certifique-se de ter instalado:

- **Sistema Operacional**: Linux (preferencialmente), macOS ou Windows
- **Docker**: Versão mais recente instalada e configurada
- **Node.js**: Versão LTS (Long Term Support)
- **npm** ou **yarn**: Gerenciador de pacotes

---

## 🛠️ Stack Tecnológica

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **Prisma** - ORM (Object-Relational Mapping)
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **TypeScript** - Superset JavaScript tipado
- **Jest** - Framework de testes

### Frontend
- **React** - Biblioteca para interfaces
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Biblioteca de componentes
- **Vite** - Build tool e dev server
- **React Router** - Roteamento
- **Axios** - Cliente HTTP
- **Zustand** - Gerenciamento de estado
- **i18next** - Internacionalização
- **Vitest** - Framework de testes

---

## ⚙️ Configuração e Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd TestTecVix
```

### 2. Configuração do Backend

#### 2.1. Navegue até a pasta do backend

```bash
cd backend-node-vix-test
```

#### 2.2. Instale as dependências

```bash
npm install
```

#### 2.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com as seguintes configurações:

```env
# URL de conexão com o banco de dados
DATABASE_URL=mysql://root:password@localhost:3312/test-cloud-db

# Configurações do MySQL
MYSQL_ROOT_PASSWORD=password
MYSQL_DATABASE=test-cloud-db
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_HOST=localhost

# Secret para geração de tokens JWT
JWT_SECRET=seu_secret_super_seguro_aqui
```

> **Nota**: A porta do banco de dados é **3312** (não confundir com a porta padrão 3306 do MySQL).

#### 2.4. Suba o banco de dados

```bash
npm run db:up
```

Este comando irá:
- Subir um container Docker com MySQL
- Utilizar o arquivo `docker-compose-db.yml`
- Expor o banco na porta **3312**

#### 2.5. Configure o Prisma e popule o banco

```bash
# Gera o Prisma Client
npx prisma generate

# Executa as migrations e popula o banco com dados de teste
npx prisma migrate reset
```

Ou, alternativamente:

```bash
npx prisma migrate deploy && npx prisma db seed
```

> **Importante**: O comando `migrate reset` irá **apagar todos os dados** e recriar o banco. Use com cuidado!

### 3. Configuração do Frontend

#### 3.1. Navegue até a pasta do frontend

```bash
cd ../frontend-react-vix-test
```

#### 3.2. Instale as dependências

```bash
npm install
```

#### 3.3. Configure as variáveis de ambiente

Crie um arquivo `.env` baseado no `.env.exemple`:

```bash
cp .env.exemple .env
```

Edite o arquivo `.env`:

```env
# URL base da API
VITE_BASE_URL=http://localhost:3001/api/v1
```

---

## 🚀 Como Executar o Projeto

### Modo Desenvolvimento

#### Backend (API)

```bash
cd backend-node-vix-test
npm run dev
```

A API estará disponível em: **http://localhost:3001**

#### Frontend

```bash
cd frontend-react-vix-test
npm run dev
```

O frontend estará disponível em: **http://localhost:3000**

---

### Modo Produção (Docker)

#### Backend

```bash
cd backend-node-vix-test

# Build da aplicação
npm run build

# Sobe o container Docker
npm run dc:up
```

#### Frontend

```bash
cd frontend-react-vix-test

# Sobe o container Docker (já faz o build automaticamente)
npm run dc:up
```

---

## 🔌 Estrutura de Portas

| Serviço  | Porta |
|----------|-------|
| Frontend | 3000  |
| Backend  | 3001  |
| MySQL    | 3312  |

---

## 📖 Conceitos Importantes

### MSP vs BrandMaster

- **Internamente** e a nível de arquitetura, temos a entidade `brandMaster` (que representa empresas dentro do sistema)
- **Comercialmente** e em muitos lugares no projeto, aparece o termo `MSP`
- Para todos os efeitos, **MSP = BrandMaster** (são a mesma entidade)

### Tipos de Usuários

#### Usuário Vituax
- Usuário **sem** `idBrandMaster` associado
- Considerado um usuário da própria Vituax

#### Usuário com BrandMaster
- Usuário **com** `idBrandMaster` associado
- Pertence a uma empresa/MSP específica

---

## 🔐 Permissões de Usuários

O sistema possui três níveis de permissão:

| Tipo      | Leitura | Criação | Edição | Exclusão |
|-----------|---------|---------|--------|----------|
| `member`  | ✅      | ❌      | ❌     | ❌       |
| `manager` | ✅      | ✅      | ✅     | ❌       |
| `admin`   | ✅      | ✅      | ✅     | ✅       |

### Detalhamento

- **Member (Membro)**: Somente leitura. Não pode criar, editar ou deletar nenhum recurso.
- **Manager (Gerente)**: Pode ler, criar e editar recursos, mas **não pode deletar**.
- **Admin (Administrador)**: Acesso total. Pode ler, criar, editar e deletar recursos.

---

## 🔑 Credenciais de Teste

Use as seguintes credenciais para testar o sistema:

```
Admin:
  Email: admin@vituax.com
  Senha: Admin@123

Manager:
  Email: manager@vituax.com
  Senha: Manager@123

Member:
  Email: member@vituax.com
  Senha: Member@123
```

> **Nota**: Essas credenciais são criadas automaticamente ao executar `npx prisma migrate reset` ou `npx prisma db seed`.

---

## 🌿 Fluxo de Desenvolvimento (GitFlow)

Para demonstrar suas habilidades com versionamento, siga este fluxo sugerido:

### 1. Estrutura de Branches

```
main (projeto original)
  └── release (suas modificações)
       ├── feature/auth-login
       ├── feature/crud-users
       ├── feature/vm-management
       ├── feature/msp-registration
       └── ...
```

### 2. Workflow Recomendado

1. **Mantenha a `main`** com o projeto original (sem modificações)
2. **Crie uma branch `release`** a partir da `main`
3. **Para cada funcionalidade/tela**, crie uma branch específica:
   ```bash
   git checkout release
   git checkout -b feature/nome-da-funcionalidade
   ```
4. **Ao finalizar cada funcionalidade**:
   - Faça commits descritivos
   - Abra um Pull Request da `feature/*` para `release`
   - Faça o merge após a sua revisão
5. **No final do teste**:
   - Teremos a branch `main` (projeto original)
   - E um Pull Request da `release` apontando para `main` (com todas as suas modificações)

### 3. Exemplo de Commits

```bash
git commit -m "feat: implementa autenticação JWT no backend"
git commit -m "feat: adiciona tela de login no frontend"
git commit -m "fix: corrige validação de senha no formulário"
git commit -m "refactor: melhora estrutura de pastas dos componentes"
git commit -m "docs: atualiza README com credenciais de teste"
```

---

## ✅ Tarefas do Desafio

### 📋 Configuração Inicial

- [ ] Criar arquivo `.env` baseado no `.env.example` (backend)
- [ ] Criar arquivo `.env` baseado no `.env.exemple` (frontend)

---

### 🔐 Autenticação e Autorização

- [ ] Implementar as rotas de CRUD para usuários
- [ ] Implementar rota de login do usuário
- [ ] Implementar tela de login `/login`
- [ ] Implementar rota de register do usuário
- [ ] Implementar tela de register `/register`
- [ ] Implementar autenticação com token JWT
- [ ] Proteger as rotas da aplicação (exceto login e register) para que somente usuários logados possam acessar
- [ ] Adicionar credenciais de usuários de teste no README e/ou `.env.example`

---

### 🗄️ Updates no Banco de Dados

- [ ] Adicionar coluna `pass` na tabela `VM` (senha da VM, respeitando regras de segurança)
- [ ] Adicionar coluna `location` do tipo `ETaskLocation` na tabela `VM`
- [ ] Adicionar coluna `hasBackup` na tabela `VM`

---

### 🏠 Funcionalidades da Home Page

**VM Card List:**

- [ ] Implementar a função de **start** da VM
- [ ] Implementar a função de **pause** da VM
- [ ] Implementar os gráficos (mocados) de **Uso de CPU**
- [ ] Implementar os gráficos (mocados) de **Uso de Memória**

---

### ➕ Criação de VM

- [ ] Implementar a lista dropdown dos **sistemas operacionais**
- [ ] Implementar corretamente a **criação de uma VM**
- [ ] Possibilitar a aceitação de **configurações dos cards de sugestão**

---

### 💾 Gerenciamento de VMs (My VMs)

**Filtros:**

- [ ] Implementar filtro de **pesquisa** (busca por nome)
- [ ] Implementar filtro por **status da VM**
- [ ] Implementar filtro por **MSP/BrandMaster**
- [ ] Implementar filtro **"Apenas minhas VMs"** (VMs exclusivas da mesma BrandMaster do usuário logado)

**Ações:**

- [ ] Possibilitar **stop/start** da VM pela tabela
- [ ] Possibilitar **stop/start** da VM pelo modal de edição

**Modal de Edição:**

- [ ] Trazer corretamente as **informações da VM** no modal
- [ ] Possibilitar editar: **senha da VM**
- [ ] Possibilitar editar: **nome da VM**
- [ ] Possibilitar editar: **vCPU**
- [ ] Possibilitar editar: **Memória**
- [ ] Possibilitar editar: **Disco**
- [ ] Possibilitar editar: **habilitar/desabilitar backup**

**Exclusão:**

- [ ] Possibilitar **deletar VM** (somente usuários tipo `admin` podem deletar)

---

### 🏢 Cadastro de MSP

**Referências visuais**: `screenshots/CadastroDeMSPStep01.png` e `screenshots/CadastroDeMSPStep02.png`

- [ ] Implementar componente para **cadastro de MSP em 2 etapas**
- [ ] Possibilitar **criar um novo MSP**
- [ ] Possibilitar **editar um MSP já existente**
- [ ] Adicionar campos de **endereço** (ou puxar pelo CEP e/ou CNPJ)
- [ ] Implementar filtros de **search**
- [ ] Implementar flag de **"Mostrar somente os que estão em POC"**

---

### 👥 Cadastro de Funcionários

**Referência visual**: `screenshots/CadastroDeFuncionarios.png`

- [ ] Implementar a tela de **cadastro de funcionários** seguindo a imagem de referência
- [ ] Atentar para a **responsividade**
- [ ] Considerar as **traduções** (i18n)

---

### 🎨 Configuração White Label

- [ ] Permitir que a **logo da empresa** do usuário seja alterada
- [ ] Somente usuários **admin** podem realizar essa alteração

---

### 👤 Configuração de Perfil e Notificações

- [ ] Permitir a edição das **informações de contato**
- [ ] Permitir a edição da **senha**
- [ ] Permitir a edição da **imagem de perfil** do usuário logado

---

### 🌟 Tarefas Opcionais/Diferenciais

#### Testes

- [ ] Implementar **testes de snapshot**
- [ ] Implementar **testes unitários**
- [ ] Implementar **testes de integração**
- [ ] Implementar **testes E2E (end-to-end)**

#### Documentação Swagger

- [ ] Fazer a **documentação Swagger da API**
- [ ] Verificar a rota `/docs` na API para visualizar a documentação

---

## 📸 Referências Visuais

As imagens de referência para as telas estão localizadas na pasta `screenshots/`:

- `CadastroDeMSPStep01.png` - Cadastro de MSP (Etapa 1)
- `CadastroDeMSPStep02.png` - Cadastro de MSP (Etapa 2)
- `CadastroDeFuncionarios.png` - Cadastro de Funcionários

Utilize essas imagens como guia para implementar as interfaces.

---

## 📝 Comandos Úteis

### Backend

```bash
# Desenvolvimento
npm run dev                 # Inicia servidor em modo desenvolvimento
npm run build              # Compila o projeto TypeScript
npm run start              # Inicia servidor em modo produção
npm run test               # Executa testes com cobertura
npm run test:dev           # Executa testes em modo watch

# Docker
npm run db:up              # Sobe o banco de dados MySQL
npm run db:down            # Para o banco de dados
npm run dc:up              # Sobe a API em container Docker
npm run dc:down            # Para a API

# Prisma
npx prisma generate        # Gera o Prisma Client
npx prisma migrate dev     # Cria e aplica migrations
npx prisma migrate reset   # Reseta o banco e aplica seeds
npx prisma studio          # Abre interface visual do banco

# Qualidade de código
npm run lint               # Verifica problemas no código
npm run lint:fix           # Corrige problemas automaticamente
npm run format             # Formata código com Prettier
```

### Frontend

```bash
# Desenvolvimento
npm run dev                # Inicia servidor de desenvolvimento
npm run build              # Compila para produção
npm run preview            # Preview da build de produção

# Docker
npm run dc:up              # Sobe o frontend em container Docker
npm run dc:down            # Para o frontend

# Testes
npm run test               # Executa testes em modo watch
npm run test:coverage      # Executa testes com cobertura

# Qualidade de código
npm run lint               # Verifica problemas no código
npm run format             # Formata código com Prettier
```

---

## 🤝 Boas Práticas

1. **Commits semânticos**: Use prefixos como `feat:`, `fix:`, `refactor:`, `docs:`, etc.
2. **Code review**: Revise seu próprio código antes de fazer o commit
3. **Testes**: Sempre que possível, adicione testes para suas funcionalidades
4. **Documentação**: Mantenha o README atualizado com suas modificações
5. **Clean code**: Siga os padrões de código já estabelecidos no projeto

---

## 📚 Recursos Adicionais

- [Documentação do Prisma](https://www.prisma.io/docs)
- [Documentação do Express](https://expressjs.com/)
- [Documentação do React](https://react.dev/)
- [Documentação do Material-UI](https://mui.com/)
- [JWT.io](https://jwt.io/) - Para entender tokens JWT

---

## 📧 Dúvidas

Se tiver dúvidas sobre o teste, entre em contato com o time da Vituax.

---

## 🎯 Lembrete Final

### Não se esqueça de:

1. ✅ **Fazer o fork** deste repositório para sua conta do GitHub
2. ✅ **Trabalhar no seu repositório** (não no repositório original)
3. ✅ **Atualizar este README** com suas modificações e soluções
4. ✅ **Enviar o link do SEU repositório** no GitHub para a equipe da Vituax

---

## 🎯 Implementações Realizadas

### ✅ Features Implementadas

#### Autenticação e Autorização
- ✅ Sistema de login completo com JWT
- ✅ Página de login (`/login`)
- ✅ Página de registro (`/register`)
- ✅ Proteção de rotas (middleware `authUser`)
- ✅ Middlewares de autorização (`isAdmin`, `isManagerOrIsAdmin`)
- ✅ Rotas da API: `POST /auth/login` e `POST /auth/register`

#### Updates no Banco de Dados
- ✅ Coluna `pass` adicionada na tabela `vM`
- ✅ Coluna `location` adicionada na tabela `vM`
- ✅ Coluna `hasBackup` já existia na tabela `vM`

#### Home Page - VM Management
- ✅ Função de **Start** da VM implementada
- ✅ Função de **Pause** da VM implementada
- ✅ Gráficos mocados de **CPU** (atualização a cada 2s)
- ✅ Gráficos mocados de **Memória** (atualização a cada 2s)
- ✅ Endpoints: `PATCH /vm/:id/start` e `PATCH /vm/:id/pause`

#### My VMs - Gerenciamento
- ✅ Filtro de **pesquisa** por nome
- ✅ Filtro por **status** (RUNNING, STOPPED, PAUSED)
- ✅ Filtro por **MSP/BrandMaster**
- ✅ Filtro "**Apenas minhas VMs**"
- ✅ **Stop/Start** via tabela
- ✅ **Stop/Start** via modal de edição
- ✅ Modal trazendo informações corretas da VM
- ✅ Edição de: nome, vCPU, memória, disco, backup
- ✅ **Deletar VM** (apenas admin)

#### Cadastro de MSP
- ✅ Componente de cadastro em 2 etapas já implementado
- ✅ Criar novo MSP funcional
- ✅ Editar MSP existente funcional
- ✅ Filtros de search
- ✅ Flag "Mostrar somente os que estão em POC"

#### Cadastro de Funcionários
- ✅ Página placeholder criada (`/employees`)
- ✅ Rota protegida (apenas manager e admin)
- ⚠️ Interface completa pendente de implementação

#### Configurações
- ✅ White Label já implementado
- ✅ Perfil e Notificações já implementado

### 📊 Estatísticas do Projeto

- **Total de Commits**: 10+
- **Pull Requests**: 7
- **Branches Criadas**: 7 feature branches
- **Arquivos Modificados**: ~25
- **Linhas de Código Adicionadas**: ~600+

### 🔧 Tecnologias e Padrões Utilizados

**Backend:**
- Node.js + Express + TypeScript
- Prisma ORM com MySQL
- JWT para autenticação
- Bcrypt para hash de senhas
- Zod para validação de dados
- Arquitetura Controller → Service → Model

**Frontend:**
- React + TypeScript
- Material-UI (MUI)
- Zustand para gerenciamento de estado
- Axios com interceptors para JWT
- React Router com rotas protegidas
- i18next para internacionalização
- Recharts para gráficos

### 📝 GitFlow Aplicado

```
main (projeto original)
  └── release (todas as modificações)
       ├── feature/update-vm-schema ✅
       ├── feature/register-page ✅
       ├── feature/home-vm-actions ✅
       ├── feature/vm-monitoring-graphs ✅
       ├── feature/vm-edit-modal ✅
       ├── feature/employee-register ✅
       └── feature/employees-route ✅
```

### 🎯 Próximos Passos Sugeridos

Para completar 100% do teste:
1. Implementar interface completa de cadastro de funcionários
2. Adicionar lista dropdown de sistemas operacionais na criação de VM
3. Implementar funcionalidade dos cards de sugestão
4. Adicionar upload de logo da empresa (White Label)
5. Implementar testes unitários e E2E

---

**Boa sorte! 🚀**

**Esperamos receber o link do seu repositório em breve!** 📬

