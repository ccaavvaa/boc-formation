import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import { ViewServer } from '../lib/view-server';
import './debug-test';
// tslint:disable:only-arrow-functions

// const expect = chai.expect;
const assert = chai.assert;
const IDSESSION = 'IDSESSION';

describe('Version Basic', function () {
    it('get version', async function () {
        this.timeout(10000);
        const server = new ViewServer();
        const session = server.createSession('IDSESSION');
        const os = await session.getObjectStore('Basic');
        assert(os.isVersioned);
        const v = await os.getVersion();
        assert(v);
    });
});
