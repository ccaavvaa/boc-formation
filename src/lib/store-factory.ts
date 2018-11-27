import * as path from 'path';
import * as boc from '@phoenix/boc';
import { IObjectStore, IDataDriverOptions } from '@phoenix/boc-interfaces';
import { Session } from './session';
import * as _ from 'lodash';
import {
    MdrObjectStore, IMdrObjectStoreHandlers, StandardMdrVersionHandler
} from '@phoenix/mdr-object-store';
import { DataDriverName, DataDriverNames } from './interfaces';
import { Utils } from './tools/utils';

export interface IObjectStoreFactorySettings {
    dataDriverOptions: IDataDriverOptions;
}
export class ObjectStoreFactory implements boc.IObjectStoreFactory {
    public readonly settings: IObjectStoreFactorySettings;
    constructor(settings: IObjectStoreFactorySettings) {
        this.settings = settings;
    }
    public async createObjectStore(
        session: boc.Session, dataDriverName: DataDriverName): Promise<IObjectStore> {

        const config = Utils.getConfig();
        const sessionOptions: IDataDriverOptions = _.cloneDeep(this.settings.dataDriverOptions);
        const sessionLogger = session.logger;
        sessionOptions.logger = sessionLogger;
        const appSession: Session = session instanceof Session ? session : undefined;
        let mdrHandlers: IMdrObjectStoreHandlers;
        if (appSession) {
            if (appSession.tenant
                && config.tenants
                && config.tenants[appSession.tenant]) {
                const tenantOptions = config.tenants[appSession.tenant];
                if (tenantOptions && tenantOptions[dataDriverName]) {
                    const options = tenantOptions[dataDriverName];
                    _.merge(sessionOptions, options);
                }
            }
            if (dataDriverName === DataDriverNames.Basic) {
                if (sessionOptions && sessionOptions.dataProtocol !== 'sql') {
                    mdrHandlers = {
                        versionHandler: new StandardMdrVersionHandler({
                            versionEntity: config.version.entityName,
                            logger: sessionLogger.createChild(null, ['upgrade']),
                            newSchemaDir: path.join(__dirname, '../../schema/Models/Basic'),
                        }),
                    };
                }
            }
        }

        const objectStore = new MdrObjectStore(sessionOptions, mdrHandlers);
        return objectStore;
    }
}
