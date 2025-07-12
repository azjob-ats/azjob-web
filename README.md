

# WikiNoths

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## 📌 Padrão de Nomeação de Branches
  ```text
  master              → Versão estável, pronta para produção.

  develop             → Branch principal de desenvolvimento.

  feature/task-1      → Para novas funcionalidades.

  bugfix/task-2       → Para correções de bugs fora da release.

  refactor/task-3     → Refatoração de código.

  fix/task-4          → Correção de bug.

  hotfix/task-5       → Para correções urgentes em produção.

  chore/task-6        → Alterações menores (configuração, documentação).

  staging             → Versão que será testada antes de ir para produção.

  release/v1-0-2      → Para preparar versões estáveis.

```
```

## **🛠  fluxo de branches do seu projeto **
                      +----------------------+
                      |      master          | <-- Versão estável (produção)
                      +----------------------+
                                ↑
                                |
                      +----------------------+
                      |      staging         | <-- Testes antes da produção
                      +----------------------+
                                ↑
                                |
                      +----------------------+
                      |      release/v1-0-2  | <-- Preparação da versão estável
                      +----------------------+
                                ↑
                                |
                      +----------------------+
                      |      develop         | <-- Desenvolvimento principal
                      +----------------------+
             ┌────────┴───────────┬──────────┬──────────┬──────────┐
             |                    |          |          |          |
 +------------------+   +-----------------+  +----------------+  +------------------+
 | feature/task-1   |   | bugfix/task-2   |  | refactor/task-3 |  | chore/task-6    |
 | Nova funcionalidade |  | Correção de bug  |  | Refatoração      |  | Alterações menores |
 +------------------+   +-----------------+  +----------------+  +------------------+
                                                                |
 +------------------+   +-----------------+
 | fix/task-4      |   | hotfix/task-5   |
 | Correção de bug |   | Correção urgente |
 +------------------+   +-----------------+

```

#### Explicação do Fluxo de Trabalho
```text
master → Branch principal e estável, usada para produção.

develop → Branch principal de desenvolvimento.

feature/task-1 → Para novas funcionalidades.

bugfix/task-2 → Correção de bugs encontrados antes de um release.

refactor/task-3 → Refatorações sem mudança de funcionalidade.

fix/task-4 → Correções normais de bugs.

hotfix/task-5 → Correções urgentes diretamente em produção.

chore/task-6 → Alterações menores como configurações ou documentação.

staging → Ambiente de homologação/teste antes de ir para master.

release/v1-0-2 → Preparação de uma versão estável antes de ir para staging e master.
```

## 📌 Padrão de Nomeação de commits
#### Exemplo de commit
```text
  feat: add login and signup pages
  fix: adjust padding on header
  refactor: extract header to a component
  chore: update angular version
```

#### Instalação do Cody

---
 - Abra o Visual Studio Code.
 - Clique no ícone de extensões no painel lateral esquerdo.
- Na barra de pesquisa, digite "Cody" e pressione Enter.
- Encontre a extensão "Cody: AI Code Assistant" desenvolvida pela Sourcegraph e clique em "Instalar".
---
#### Mensagem para Cody

---
to write only a commit title message to describe the changes made in all files for this diff using this pattern: `feat`, `fix`, `refactor`, `revert`, `style`, `test`, `i18n`, `initial`, `analytics`, `database`, `mock`, `build`, `ci`, `chore` e `doc` The massage must be imperative and in lowercase.
---

#### Como pensar para criar um commit
---
- Deve ser imperativo
- Fala o que foi feito, e não o que você fez
- Se eu aplicar esse commit, esse commit vai fazer o que?
---


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Configuring application environments

You can choose which configuration to use with the `--configuration option.`

```sh
ng build --configuration debug
```

### Comando para analisar e corrigir um arquivo específico

`npx eslint --fix caminho/para/seu/arquivo.ts`.
### Explicação:
###### `--fix`: Aplica as correções automáticas.
###### `caminho/para/seu/arquivo.ts`: Caminho do arquivo que você deseja analisar.

###### Isso vai analisar apenas o arquivo especificado e aplicar as correções de linting e formatação definidas nas regras do ESLint e Prettier.


### Rodar o comando para corrigir o código automaticamente:
`npx eslint --fix .`

### Limpar o cache do ESLint e rodar novamente
`eslint --cache --cache-location node_modules/.cache/eslint --fix`

#### Testar um arquivo específico no Angular com Jest
```sh
npx jest src/app/meu.component.spec.ts --watch
```

#### Instalar IA Gemini CLI
```sh
npm install -g @google/gemini-cli
```

```sh
gemini
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Documentação
## Injeção de Dependência no Angular

Este documento explica as diferenças entre os métodos de injeção de dependência no Angular e quando utilizar cada um.

## 1. `@Inject('aLanguage') private api: LanguageService;`

### Como funciona?
O Angular permite fornecer serviços utilizando tokens personalizados, como strings ou `InjectionToken`. Esse método é utilizado quando queremos especificar manualmente qual provedor deve ser utilizado para injetar um serviço.

### Exemplo:
```typescript
@Component({
  selector: 'app-example',
  providers: [{ provide: 'aLanguage', useClass: LanguageService }],
})
export class ExampleComponent {
  constructor(@Inject('aLanguage') private api: LanguageService) { }
}
```

### Quando usar?
- Quando precisamos fornecer diferentes implementações de um mesmo serviço.
- Quando o serviço é fornecido via um `InjectionToken`.
- Quando trabalhamos com valores estáticos ou objetos personalizados ao invés de classes.

---

## 2. `constructor(private api: LanguageService) { }`

### Como funciona?
Esse é o método mais comum de injeção de dependência. O Angular injeta automaticamente o serviço com base na classe fornecida, desde que ele esteja registrado corretamente como um provider.

### Exemplo:
```typescript
@Injectable({ providedIn: 'root' })
export class LanguageService {
  // ...
}

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent {
  constructor(private api: LanguageService) { }
}
```

### Quando usar?
✅ Quando o serviço é singleton e está registrado globalmente (`providedIn: 'root'`).  
✅ Quando queremos injeção automática sem configuração adicional.  
✅ É o método recomendado na maioria dos casos.  

---

## 3. `private api: LanguageService = inject(LanguageService);`

### Como funciona?
A API `inject()` permite injetar dependências sem precisar do construtor. Essa abordagem funciona apenas dentro de classes que suportam injeção de dependência (`@Injectable`, `@Component`, etc.).

### Exemplo:
```typescript
@Injectable({ providedIn: 'root' })
export class ExampleService {
  private api: LanguageService = inject(LanguageService);

  someMethod() {
    this.api.getLanguage();
  }
}
```

### Quando usar?
✅ Em `services`, `directives` e `pipes` para evitar um construtor desnecessário.  
✅ Quando a injeção precisa ocorrer fora do contexto de um construtor.  
🛑 **Não pode ser usado diretamente em classes normais sem decorator Angular.**

---

## 🔥 Resumo das Diferenças

| Abordagem | Como funciona? | Quando usar? |
|-----------|---------------|--------------|
| `@Inject('aLanguage')` | Injeção com um token personalizado | Quando o provider é definido manualmente com um token string/injectionToken |
| `constructor(private api: LanguageService)` | Injeção automática pelo Angular | Método mais comum para serviços globais (`providedIn: 'root'`) |
| `inject(LanguageService)` | Injeção sem construtor (Angular 14+) | Quando a injeção precisa ocorrer fora do construtor (services, directives, pipes) |

Se for apenas um serviço comum registrado globalmente, **use a injeção no construtor** (`constructor(private api: LanguageService)`). Se precisar de mais flexibilidade, escolha `@Inject()` ou `inject()` conforme necessário. 🚀

