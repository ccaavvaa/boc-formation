import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import './debug-test';
import { Helpers } from '../lib/rules/helpers';
import { createContainer } from './test-helpers';
import { Person } from '../lib/models/Person';
const expect = chai.expect;
// tslint:disable:only-arrow-functions
describe('Helpers', function () {
    it('checkEmptyProp with empty prop', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_personId('not empty');
        Helpers.checkEmptyProp(person, 'personId');
        expect(!person.hasErrors);
        await person.set_personId('');
        Helpers.checkEmptyProp(person, 'personId');
        expect(person.hasErrors);
        const err = person.errors.errors.get('personId')[0];
        expect(err.error.message === c.t('Valeur obligatoire'));
    });
    it('checkEmptyProp with empty date', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_birthDate(new boc.DateTime('date'));
        Helpers.checkEmptyProp(person, 'birthDate');
        expect(person.hasErrors);
        const err = person.errors.errors.get('birthDate')[0];
        expect(err.error.message === c.t('Valeur obligatoire'));
        await person.set_birthDate(new boc.DateTime('date', 2018, 11, 11));
        person.errors.clearErrors('birthDate');
        Helpers.checkEmptyProp(person, 'birthDate');
        expect(!person.hasErrors);
    });

});