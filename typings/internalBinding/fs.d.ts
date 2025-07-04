import { ConstantsBinding } from './constants';

interface ReadFileContext {
  fd: number | undefined;
  isUserFd: boolean | undefined;
  size: number;
  callback: (err?: Error, data?: string | Uint8Array) => unknown;
  buffers: Uint8Array[];
  buffer: Uint8Array;
  pos: number;
  encoding: string;
  err: Error | null;
  signal: unknown /* AbortSignal | undefined */;
}
