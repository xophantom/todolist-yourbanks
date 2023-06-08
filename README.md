# To Do List - Lista de Tarefas

Essa aplicação foi desenvolvida para completar o teste técnico proposto para a vaga de desenvolvedor. A aplicação encontra-se hospedada nos servidores da vercel com CI/CD configurado automaticamente para a branch main, implicando em atualizações automáticas toda vez que a branch main for atualizada, você pode visualizar a aplicação funcionando [aqui](https://todolist-yoursbank.vercel.app/). Você também pode visualizar o estado das builds e deploys de cada commit visualizando o histórico de commits [aqui](https://github.com/xophantom/todolist-yourbanks/commits/main).

## Tecnologias

Esse projeto foi desenvolvido utilizando algumas das mais recentes tecnologias como Next.js e React, TypeScript para adicionar tipagem estática ao JavaScript, Material-UI para garantir uma interface bonita e responsiva, Yup para validação de formulários em conjunto com react hooks forms para gerenciamento de formulários.

O projeto possui uma série de filtros para garantir a qualidade do código criado, como [linters](https://eslint.org/) e [testes unitários](https://jestjs.io/en/). A cobertura de testes unitários está com 95%, para os testes E2E utilizei o [Playwright](https://playwright.dev/) para realizar testes end-to-end e garantir que todos os componentes e funcionalidades estejam funcionando corretamente.

## Scripts disponíveis

### npm i

Instala as dependências do projeto.

### npm run dev

Inicia o projeto na sua máquina local.

### npm run test

Executa todos os testes unitários do projeto.

### npm run e2e:headed

Executa todos os testes unitários com um browser visível para acompanhamento. (Não irá funcionar caso seu terminal não tenha interface gráfica, como no WSL).

### npm run e2e

Executa todos os testes unitários com um browser sem interface gráfica para máquinas que possuem somente o terminal.
