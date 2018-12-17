import * as boc from '@phoenix/boc';
import 'mocha';
import { assert, expect } from 'chai';
import '../debug-test';
import { createContainer } from '../test-helpers';
import { TestFindRelation, PersonData } from '../../lib/views/find-relation/find-relation';

// tslint:disable:only-arrow-functions
describe('FindRelation', function () {
    it('load', async function () {
        const c = createContainer();
        const t = await c.createNew<TestFindRelation>(TestFindRelation);
        let data: PersonData[];
        data = await t.persons.toArray();
        expect(data.length).equals(5);
        await t.persons.set_pageNumber(2);
        data = await t.persons.toArray();
        expect(data.length).equals(5);
        await t.persons.set_pageSize(3);
        data = await t.persons.toArray();
        expect(data.length).equals(3);
        await t.persons.set_sort('name desc');
        data = await t.persons.toArray();
        expect(data[0].name).equals('Smith');
    });
});
