import { CtrlBaseHandler } from '@phoenix/boc-server';
import { m } from '@phoenix/service-route';
import { VersionCtrl } from '../controllers/version';

export class VersionHandler extends CtrlBaseHandler {

    constructor() {
        super(new VersionCtrl());
    }

    public get sessionless() {
        return true;
    }

    @m({
        tags: ['Version'],
        summary: 'get version from package.json',
        parameters: [],
    })
    public get() {
        this.try(async (): Promise<any> => {
            const c = this.ctrl as VersionCtrl;
            return c.getVersion();
        });
    }
}