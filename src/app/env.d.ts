declare interface Env {
    readonly NODE_ENV: string;
    [key: string]: any;
    readonly NG_APP_NAME: string;
}

declare interface ImportMeta {
    readonly env: Env;
}

declare const _NGX_ENV_: Env;