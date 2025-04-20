# Quiz App

Este é um aplicativo de quiz com sistema de autenticação completo, desenvolvido com Next.js e Tailwind CSS.

## Funcionalidades Implementadas

### Sistema de Autenticação
- **Página de Login**: Campos para e-mail e senha, com validação e mensagens de erro
- **Criação de Conta**: Formulário com campos para nome, sobrenome, e-mail, senha e confirmação de senha
- **Recuperação de Senha**: Funcionalidade para usuários que esqueceram suas senhas
- **Dashboard**: Página principal protegida, acessível apenas após autenticação

### Credenciais de Teste
- **E-mail**: teste@exemplo.com
- **Senha**: senha123

## Tecnologias Utilizadas

- **Next.js**: Framework React para desenvolvimento web
- **Tailwind CSS**: Framework CSS para design responsivo
- **TypeScript**: Superset JavaScript com tipagem estática
- **React Context API**: Para gerenciamento de estado de autenticação

## Estrutura do Projeto

- `/src/app/login`: Página de login
- `/src/app/signup`: Página de criação de conta
- `/src/app/forgot-password`: Página de recuperação de senha
- `/src/app/dashboard`: Dashboard principal (protegido)
- `/src/lib/auth.ts`: Sistema de autenticação

## Como Executar Localmente

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse http://localhost:3000 no navegador

## Próximos Passos

- Implementação das funcionalidades do quiz
- Criação de perguntas e respostas
- Sistema de pontuação
- Histórico de resultados

## Observações

Este projeto utiliza armazenamento local (localStorage) para simular um banco de dados. Em um ambiente de produção, seria necessário implementar um backend real com banco de dados para armazenar informações de usuários e gerenciar autenticação de forma segura.
