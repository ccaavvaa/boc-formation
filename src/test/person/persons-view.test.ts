import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { PersonsView } from '../../lib/views/person/PersonsView';
import { createContainer } from '../test-helpers';
import { PersonRules } from '../../lib/rules/person/PersonRules';
// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('PersonsView', function () {
    it('create with model ', async function () {
        const c = createContainer();
        const view = await c.createNew<PersonsView>(PersonsView);
        const data = await view.getAllData(null);
        assert(data);
    });
});
