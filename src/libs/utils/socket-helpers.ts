/**
 * Socket helpers — mock implementation (no backend).
 *
 * Real-time updates were delivered over socket.io. With the backend removed,
 * `initialSocketConnection` returns a no-op fake socket that implements the
 * methods consumers use (`on`, `off`, `emit`, `disconnect`, ...) but never
 * opens a network connection.
 */

export type FakeSocket = {
  id: string;
  connected: boolean;
  on: (event: string, listener?: (...args: any[]) => void) => FakeSocket;
  off: (event?: string, listener?: (...args: any[]) => void) => FakeSocket;
  once: (event: string, listener?: (...args: any[]) => void) => FakeSocket;
  emit: (event: string, ...args: any[]) => FakeSocket;
  connect: () => FakeSocket;
  disconnect: () => FakeSocket;
  removeListener: (event?: string, listener?: (...args: any[]) => void) => FakeSocket;
  removeAllListeners: (event?: string) => FakeSocket;
};

const createFakeSocket = (): FakeSocket => {
  const socket: FakeSocket = {
    id: 'mock-socket',
    connected: false,
    on: () => socket,
    off: () => socket,
    once: () => socket,
    emit: () => socket,
    connect: () => socket,
    disconnect: () => socket,
    removeListener: () => socket,
    removeAllListeners: () => socket,
  };
  return socket;
};

export const initialSocketConnection = async (_socketUrl: string) => {
  return createFakeSocket();
};
