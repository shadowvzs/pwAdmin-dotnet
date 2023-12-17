export interface IDisposable {
    addDisposable: (cb: () => void) => void;
    dispose: () => void;
}

export type Params<T> = T extends (...args: infer P) => unknown ? P : never;
export type RetType<T> = T extends (...args: unknown[]) => infer R ? R : never;