export enum eProtocol { HTTPS = 'https://', HTTP = 'http://' };
export enum eTLD { COM = '.com', BR = '.br', ORG = '.org' };
export enum eVersion { v1 = '/v1' };
export enum ePreview { public = '/public', private = '/private' };
export enum ePort { default = ':80', _8080 = ':8080', _4200 = ':4200', _3000 = ':3000' };

export interface iUrl {
    protocol: eProtocol;
    subdomain?: string;
    domain: string;
    port?: ePort;
    TLD?: eTLD[]
    version?: eVersion;
    preview?: ePreview;
    subdirectory: string;
}