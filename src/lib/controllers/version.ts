import { BaseController } from '@phoenix/boc-server';
import { Utils } from '../tools/utils';

export class VersionCtrl extends BaseController {

    public async getVersion(): Promise<any> {
        const version = Utils.getVersion();
        return { version };
    }

}