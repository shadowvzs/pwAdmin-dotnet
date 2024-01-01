declare module '*.css';

declare module '*.mjs' {
    let messages: Record<string, string>;
}

declare module '*.json' {
    const value: Record<string, unknown>;
    export default value;
}
