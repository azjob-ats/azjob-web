import type { Config } from 'jest';

const config: Config = {
  testMatch: ['**/*.spec.ts'],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true, // Ativa a coleta de cobertura
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@env/(.*)$': '<rootDir>/src/environments/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@domain/(.*)$': '<rootDir>/src/app/domain/$1',
    '^@widget/(.*)$': '<rootDir>/src/app/widget/$1',
  },
  collectCoverageFrom: [
    'src/app/**/*.ts', // Inclui todos os arquivos TypeScript dentro da pasta src/app
    '!src/app/**/*.module.ts', // Exclui arquivos de módulos
    '!src/app/**/*.mock.ts', // Exclui mocks, caso existam
    '!src/app/**/*.enum.ts', // Exclui enum, caso existam
    '!src/app/**/*.constant.ts', // Exclui constant, caso existam
    '!src/app/**/*.configs.ts', // Exclui configs, caso existam
    '!src/app/**/*.config.ts', // Exclui configs, caso existam
    '!src/app/**/*.routes.ts', // Exclui routes, caso existam
    '!src/app/**/*.preset.ts', // Exclui tema, caso existam
    '!src/app/domain/showcase/**/*.ts', // Exclui tema, caso existam
    '!src/app/domain/change-language/**/*.ts', // Exclui modulo change language, caso existam
    '!src/app/core/**/*.ts', // Exclui modulo core, caso existam
    '!src/app/**/*.d.ts', // Exclui env, caso existam
  ],
  coverageDirectory: 'coverage', // Pasta onde o relatório será salvo
  coverageReporters: [
    'html', // Gera um relatório visual em HTML (recomendado)
    'text', // Gera o relatório no terminal (útil para CI/CD)
    'lcov', // Gera um relatório LCOV (padrão de cobertura de código)
  ],
  coverageThreshold: {
    global: {
      statements: 50, // Percentual mínimo de declarações cobertas
      branches: 50, // Percentual mínimo de ramificações cobertas
      functions: 50, // Percentual mínimo de funções cobertas
      lines: 50, // Percentual mínimo de linhas cobertas
    },
  },
};

export default config;
