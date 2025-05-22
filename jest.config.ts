import type { Config } from 'jest';

const config: Config = {
  testMatch: ['**/*.spec.ts'],
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  collectCoverage: true, // Ativa a coleta de cobertura
  moduleNameMapper: {
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
  },
  collectCoverageFrom: [
    'src/app/**/*.ts', // Inclui todos os arquivos TypeScript dentro da pasta src/app
    '!src/app/**/*.module.ts', // Exclui arquivos de módulos
    '!src/app/**/*.mock.ts', // Exclui mocks, caso existam
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
