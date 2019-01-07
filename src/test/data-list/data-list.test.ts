import * as boc from '@phoenix/boc';
import 'mocha';
import { assert, expect } from 'chai';
import '../debug-test';
import { createContainer, session } from '../test-helpers';
import { FindResult } from '@phoenix/boc-interfaces';
import { PersonData } from '../../lib/views/person/PersonData';
import { Person } from '../../lib/models/Person';

// tslint:disable:only-arrow-functions
describe('DataList', function () {
    it('simple', async function () {
        const c = createContainer();
        const data: any[] = [];
        for (let i = 0; i < 10; i++) {
            data.push({
                name: i.toString(),
                firstName: i.toString(),
                personId: i,
            });
        }
        const dataProvider = () => Promise.resolve(data);
        const dl = new boc.DataList<PersonData>(c, PersonData, {
            autoDestroyInstances: true,
            cloneData: true,
            newObjects: true,
        }, dataProvider);
        await dl.load();
        const items = dl.items;
        expect(items.length).equals(10);
        expect(items[0].name).equals('0');
    });
    it('find', async function () {
        const c = createContainer();
        const dl = new boc.FindDataList<PersonData>(c, PersonData, Person, {
            limit: 5,
            count: true,
            select: ['personId', 'firstName', 'name'],
        }, {
                autoDestroyInstances: true,
                cloneData: true,
                newObjects: true,
            });
        await dl.load();
        let items = dl.items;
        expect(items.length).equals(5);
        expect(dl.totalCount).greaterThan(100);
        dl.filter = { firstName: 'John' };
        await dl.load();
        items = dl.items;
        expect(items.length).equals(2);
        expect(items.find((p) => p.firstName !== 'John') ? true : false).equals(false);
    });
});
