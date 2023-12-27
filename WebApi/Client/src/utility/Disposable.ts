import type { IDisposable } from '@ts/utilities';

class Disposable implements IDisposable {
    private disposers: (() => void)[] = [];

    public addDisposable(cb: () => void) {
        this.disposers.push(cb);
    }

    public dispose() {
        this.disposers.forEach(x => x());
        const instance = this as unknown as Record<string, string>;
        Object.keys(instance)
            .forEach(x => {
                const prop = Reflect.get(instance, x) as unknown as { dispose: () => void };
                if (!prop || typeof prop !== 'object' || !Reflect.has(prop , 'dispose')) { return; }
                (prop as { dispose: () => void }).dispose();
            });
    }
}

export default Disposable;