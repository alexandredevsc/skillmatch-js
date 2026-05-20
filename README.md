# SkillMatch JS 🎯

> Simulador de compatibilidade entre perfil de candidato e vagas de Front-End Júnior.

![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github)

---

## Sobre o projeto

O **SkillMatch JS** é um simulador que compara as habilidades de um candidato com os requisitos de vagas fictícias de Front-End Júnior. O projeto foi desenvolvido como Mini-Projeto Avaliativo do Módulo 01 do curso de Desenvolvedor Front-End React.

O sistema exibe:

- Percentual de compatibilidade por vaga
- Habilidades encontradas e faltantes
- Vaga mais compatível com o perfil
- Recomendação de estudos personalizada
- Interface web responsiva e interativa

---

## Como a internet funciona (resumo técnico)

A internet é uma rede global de computadores que se comunicam usando protocolos padronizados (principalmente TCP/IP). Quando você acessa um site, seu navegador (cliente) envia uma requisição HTTP/HTTPS para um servidor, que processa a solicitação e retorna os arquivos (HTML, CSS, JS). Esse modelo é chamado de **arquitetura cliente-servidor**.

### Arquitetura cliente-servidor

| Componente | Papel |
|---|---|
| **Cliente** | Navegador que solicita e renderiza a página |
| **Servidor** | Máquina que armazena e entrega os arquivos |
| **Protocolo** | HTTP/HTTPS: define como a comunicação acontece |
| **DNS** | Traduz domínios (ex: google.com) para endereços IP |

Neste projeto, simulamos uma chamada ao servidor usando `Promise` + `setTimeout`, que imita a latência real de uma requisição assíncrona.

---

## Como executar

### Opção 1 — Interface Web (recomendado)

1. Faça o clone do repositório
2. Abra o arquivo `index.html` diretamente no navegador (duplo clique)
3. Configure o perfil do candidato na interface e clique em **Analisar compatibilidade**

### Opção 2 — Console do navegador

1. Abra o Google Chrome
2. Pressione `F12` ou `Ctrl + Shift + J`
3. Vá na aba **Console**
4. Copie o conteúdo de `skillmatch.js`
5. Cole no console e pressione `Enter`

### Opção 3 — VS Code + extensão

1. Instale a extensão **Code Runner** (`formulahendry.code-runner`)
2. Abra o arquivo `skillmatch.js`
3. Pressione `Ctrl + Alt + N` para executar

---

## Estrutura do projeto

```
skillmatch-js/
├── skillmatch.js          ← lógica pura em JavaScript
├── index.html             ← interface web (HTML + CSS + JS embutido)
├── README.md              ← este arquivo
└── planejamento/
    └── tarefas-kanban.md  ← registro das tarefas do Kanban
```

---

## Conceitos de JavaScript aplicados

| Conceito | Onde foi usado |
|---|---|
| `const` e `let` | Em todas as declarações de variáveis |
| Tipos de dados | Strings, números, arrays, objetos, booleanos |
| `if-else` | Classificação de compatibilidade (RF04) |
| Operadores lógicos e matemáticos | Cálculo de percentual |
| `for...of` / `forEach` | Iteração sobre vagas e habilidades |
| Funções e arrow functions | Todas as funções de análise |
| Arrays | Lista de vagas e habilidades |
| `map` | Geração de resultados por vaga |
| `filter` | Habilidades encontradas e faltantes |
| `find` | Busca de vaga por ID |
| `every` | Verifica se candidato atende 100% |
| `reduce` | Melhor vaga e lista de habilidades únicas |
| Objetos | Candidato e resultado de análise |
| Classes | `Vaga` (base) e `VagaFrontEnd` (herança) |
| Construtor | `constructor()` em ambas as classes |
| Herança | `VagaFrontEnd extends Vaga` |
| `this` | Métodos `exibirResumo()` e `exibirNivel()` |
| Callback | `finalizarAnalise(nome, callback)` |
| Closure | `criarContadorDeAnalises()` |
| Promise | `buscarVagasSimuladas()` |
| `async/await` | `iniciarSistema()` / `executarAnalise()` |

### Sobre `var`, `let` e `const`

- **`const`**: usada para valores que não serão reatribuídos (objetos, arrays, funções). É o padrão moderno.
- **`let`**: usada para variáveis que precisam ser reatribuídas (contadores, resultados temporários).
- **`var`**: declaração legada com escopo de função (não de bloco). Pode causar bugs por hoisting e vazamento de escopo. **Evitada neste projeto** em favor de `const` e `let`.

---

## Extensões utilizadas / recomendadas

| Extensão | ID | Finalidade |
|---|---|---|
| Code Runner | `formulahendry.code-runner` | Executar JS direto no VS Code |
| ESLint | `dbaeumer.vscode-eslint` | Análise de qualidade do código |
| Prettier | `esbenp.prettier-vscode` | Formatação automática |
| GitLens | `eamodio.gitlens` | Histórico de commits avançado |

---

## Branches utilizadas

```
main              ← código estável e entregável
develop           ← integração contínua
feat/dados-candidato-vagas    ← RF01 e RF02
feat/calculo-compatibilidade  ← RF03 ao RF08
feat/classes-poo              ← RF09 ao RF11
feat/async-callbacks          ← RF12 ao RF14
docs/readme-video             ← documentação e vídeo
```

---

## Critérios atendidos

- [x] Objeto candidato com habilidades e experiência
- [x] Array com 4 vagas fictícias (instâncias de classe)
- [x] Cálculo de compatibilidade por vaga
- [x] Habilidades faltantes e encontradas por vaga
- [x] Classificação: alta / média / baixa compatibilidade
- [x] Vaga com maior compatibilidade (reduce)
- [x] Recomendação de estudo baseada nas lacunas
- [x] Uso de `map`, `filter`, `find`, `every` e `reduce`
- [x] Classe `Vaga` com construtor, atributos e método
- [x] Herança: `VagaFrontEnd extends Vaga`
- [x] Uso do `this` em métodos de classe
- [x] Callback: `finalizarAnalise()`
- [x] Closure: `criarContadorDeAnalises()`
- [x] Promise simulada: `buscarVagasSimuladas()`
- [x] Async/Await: `iniciarSistema()` / `executarAnalise()`
- [x] Interface web responsiva (HTML + CSS + JS)
- [x] README completo
- [x] Quadro Kanban
- [x] Repositório público no GitHub com branches e commits

---

## Autoria

Desenvolvido por **[Seu Nome]** — Turma 01/02 · Módulo 01 · Semana 06  
Curso: Desenvolvedor Front-End React · QP 300h Síncrono

📺 [Vídeo de apresentação](https://seu-link-aqui)  
📋 [Quadro Kanban](https://seu-link-aqui)
