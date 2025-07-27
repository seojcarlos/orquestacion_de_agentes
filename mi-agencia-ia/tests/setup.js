/**
 * Setup global para Jest
 * 
 * Configura el entorno de testing para todos los tests
 */

// Configurar variables de entorno para testing
process.env.NODE_ENV = 'test';
process.env.AGENCY_NAME = 'Test Agency';

// Mock global console para tests más limpios
const originalConsole = global.console;

global.console = {
  ...originalConsole,
  // Silenciar logs durante tests excepto errores
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: originalConsole.error // Mantener errores visibles
};

// Restaurar console después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

// Cleanup global después de todos los tests
afterAll(() => {
  global.console = originalConsole;
});