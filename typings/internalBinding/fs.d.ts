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

declare namespace InternalFSBinding {
  class FSReqCallback<ResultType = unknown> {
    constructor(bigint?: boolean);
    oncomplete((error: Error) => void) | ((error: null, result: ResultType) => void);
    contest: ReadFileContext;
  }

  interface FSSyncContext {
    fd?: number;
    path?: string;
    dest?: string;
    errno?: string;
    message?: string;
    syscall?: string;
    error?; Error;
  }

  type Buffer = Uint8Array;
  type Stream = object;
  type StringOrBuffer = string | Buffer;

  const KUsePromises: unique symbol;

  class FileHandle {
    constructor(fd: number, offset: number, length: number);
    fd: number;
    getAsyncId(): number;
    close(): Promise<void>;
    onread: () => void;
    stream: Stream;
  }

  class StatWatcher {
    constructor(useBigint: boolean);
    initialized: boolean;
    start(path: string, interval: number): number;
    getAsyncId(): number;
    close(): void;
    ref(): void;
    unref(): void;
    onchange: (status: number, eventType: string, filename: string | Buffer) => void;
  }

  function access(path: StringOrBuffer, mode: number, req: FSReqCallback): void;
  function access(path: StringOrBuffer, mode: number): void;
  function access(path: StringOrBuffer, mode: number, usePromises: typeof KUsePromises): Promise<void>;

  function chmod(path: string, mode: number, req: FSReqCallback): void;
  function chmod(path: string, mode: number): void;
  function chmod(path: string, mode: number, usePromises: typeof KUsePromises): Promise<void>;

  function chown(path: string, uid: number, gid: number, req: FSReqCallback): void;
  function chown(path: string, uid: number, gid: number, req: undefined, ctx: FSSyncContext): void;
  function chown(path: string, uid: number, gid: number, usePromises: typeof kUsePromises): Promise<void>;
  function chown(path: string, uid: number, gid: number): void;

  function close(fd: number, req: FSReqCallback): void;
  function close(fd: number): void;

  function copyFile(src: StringOrBuffer, dest: StringOrBuffer, mode: number, req: FSReqCallback): void;
  function copyFile(src: StringOrBuffer, dest: StringOrBuffer, mode: number, req: undefined, ctx: FSSyncContext): void;
  function copyFile(src: StringOrBuffer, dest: StringOrBuffer, mode: number, usePromises: typeof kUsePromises): Promise<void>;

  function cpSyncCheckPaths(src: StringOrBuffer, dest: StringOrBuffer, dereference: boolean, recursive: boolean): void;
  function cpSyncOverrideFile(src: StringOrBuffer, dest: StringOrBuffer, mode: number, preserveTimestamps: boolean): void;
  function cpSyncCopyDir(src: StringOrBuffer, dest: StringOrBuffer, force: boolean, errorOnExist: boolean, verbatimSymlinks: boolean, dereference: boolean): void;

  function fchmod(fd: number, mode: number, req: FSReqCallback): void;
  function fchmod(fd: number, mode: number): void;
  function fchmod(fd: number, mode: number, usePromises: typeof kUsePromises): Promise<void>;

  function fchown(fd: number, uid: number, gid: number, req: FSReqCallback): void;
  function fchown(fd: number, uid: number, gid: number): void;
  function fchown(fd: number, uid: number, gid: number, usePromises: typeof kUsePromises): Promise<void>;
}
