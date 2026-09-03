// RNTL v13+ registra automáticamente sus matchers de Jest al importar la librería.
import { resetMockDb } from '@/mock/db';

// Almacén en memoria para simular `expo-secure-store` en los tests de Node.
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __esModule: true,
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'whenUnlockedThisDeviceOnly',
    getItemAsync: jest.fn(async (key: string) => store.get(key) ?? null),
    setItemAsync: jest.fn(async (key: string, value: string) => {
      store.set(key, value);
    }),
    deleteItemAsync: jest.fn(async (key: string) => {
      store.delete(key);
    }),
  };
});

jest.mock('expo-constants', () => ({
  __esModule: true,
  default: { expoConfig: { extra: { useMockApi: true, mockLatencyMs: 0 } } },
}));

beforeEach(() => {
  resetMockDb();
});
