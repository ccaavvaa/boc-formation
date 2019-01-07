import * as boc from '@phoenix/boc';
import 'mocha';
import { assert, expect } from 'chai';
import '../debug-test';
import { createContainer, session } from '../test-helpers';
import { FindResult } from '@phoenix/boc-interfaces';

// tslint:disable:only-arrow-functions
describe('FindDataFactory', function () {
    it('simple', async function () {
        const result = await session.getDataset({
            datasetName: 'persons',
        });
        expect(result.count).to.be.greaterThan(0);
        expect(result.value.length).equals(5);
    });
    it('filter', async function () {
        const result = await session.getDataset({
            datasetName: 'persons',
            filter: { firstName: 'John' },
        });
        expect(result.count).to.be.greaterThan(0);
        expect(result.value.length).equals(2);
    });
});

describe('ObjectDataFactory', function () {
    it('simple', async function () {
        let result: FindResult;
        result = await session.getDataset({
            datasetName: 'personData',
            pageSize: 1,
        });
        expect(result.count).equals(2);
        expect(result.value.length).equals(1);
        result = await session.getDataset({
            datasetName: 'personData',
            pageNumber: 2,
            pageSize: 1,
        });
        expect(result.count).equals(2);
        expect(result.value.length).equals(1);
    });
    it('filter', async function () {
        const result = await session.getDataset({
            datasetName: 'personData',
            filter: { name: 'Smith' },
            pageSize: 5,
        });
        expect(result.count).equals(1);
        expect(result.value.length).equals(1);
    });
});
