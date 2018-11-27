import * as boc from '@phoenix/boc';
import { DataDriverNames } from './interfaces';
import { MdrObjectStore } from '@phoenix/mdr-object-store';
import { Utils } from './tools/utils';
import { ExtError } from '@phoenix/server-commons';

export class Session extends boc.Session {
    private _tenant: string;
    private _cookies: any;

    constructor(server: boc.Server, id: string, tenant: string, cookies: any) {
        super(server, id);
        const log = this.logger.verbose(`Create session ${id}, tenant ${tenant}`);
        this._tenant = tenant;
        this._cookies = cookies;
        this.logger.debug(cookies, log);
    }
    public get tenant(): string {
        return this._tenant;
    }

    public get cookies(): any {
        return this._cookies;
    }
    public checkRequest(request: any) {
        const rt = SessionFactory.extractTenant(request);
        if (rt !== this.tenant) {
            throw new ExtError(
                400, `Tenant from request ${rt} doesn't match session tenant ${this.tenant}`);
        }
    }
    public update(request: any) {
        const newCookies = request.cookies;
        if (!newCookies) {
            return;
        }
    }

    public getCookie(cookieName: string): string {
        if (!this._cookies) {
            return undefined;
        }
        return this._cookies[cookieName];
    }

    // public async checkVersion(): Promise<void> {
    //     const config = Utils.getConfig();

    //     if (!config.checkVersion) {
    //         return;
    //     }
    //     const versionAllreadyChecked = typeof this.versionOK !== 'undefined';
    //     if (versionAllreadyChecked) {
    //         return;
    //     }
    //     const message = this.lockMessage;
    //     const messages: string[] = message ? [message] : [];
    //     let versionAccessionOK = true;
    //     const os = this.objectStores.get(DataDriverNames.Accession);
    //     if (os instanceof MdrObjectStore) {
    //         const errMessage = await os.checkVersion();
    //         versionAccessionOK = !errMessage;
    //         if (!versionAccessionOK) {
    //             messages.push(`Base Accession: ${errMessage}`);
    //         }
    //     }
    //     this.versionOK = versionAccessionOK;
    //     if (messages.length) {
    //         this.lockMessage = messages.join('\n');
    //     }
    // }
}
export class SessionFactory implements boc.ISessionFactory {
    public static extractTenant(request: any): string {
        const tenant: string = request && request.tenant ? request.tenant : null;
        return tenant;
    }
    public createSession(server: boc.Server, idSession: string, request?: any): boc.Session {
        const tenant = SessionFactory.extractTenant(request);
        const cookies = request ? request.cookies : null;
        const session = new Session(server, idSession, tenant, cookies);
        return session;
    }
}