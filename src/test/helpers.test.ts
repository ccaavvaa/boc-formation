import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import './debug-test';
import { Helpers } from '../lib/rules/helpers';
import { createContainer } from './test-helpers';
import { Person } from '../lib/models/Person';
const assert = chai.assert;
// tslint:disable:only-arrow-functions
describe('Helpers', function () {
    describe('checkEmptyProp', function () {
        it('checkEmptyProp with empty prop', async function () {
            const c = createContainer();
            const person = await c.createNew<Person>(Person);
            await person.set_personId('not empty');
            Helpers.checkEmptyProp(person, 'personId');
            assert(!person.hasErrors);
            await person.set_personId('');
            Helpers.checkEmptyProp(person, 'personId');
            assert(person.hasErrors);
            const err = person.errors.errors.get('personId')[0];
            assert(err.error.message === c.t('Valeur obligatoire'));
        });
        it('checkEmptyProp with empty date', async function () {
            const c = createContainer();
            const person = await c.createNew<Person>(Person);
            await person.set_birthDate(new boc.DateTime('date'));
            Helpers.checkEmptyProp(person, 'birthDate');
            assert(person.hasErrors);
            const err = person.errors.errors.get('birthDate')[0];
            assert(err.error.message === c.t('Valeur obligatoire'));
            await person.set_birthDate(new boc.DateTime('date', 2018, 11, 11));
            person.errors.clearErrors('birthDate');
            Helpers.checkEmptyProp(person, 'birthDate');
            assert(!person.hasErrors);
        });
    });
    describe('getAge', function () {
        it('calculate age', function () {
            const today = new boc.DateTime('date', new Date());
            const oneYearAgo = today.addYears(-1);
            const oneYearAgo2 = oneYearAgo.addDays(2);
            const tests: Array<{
                birthDate: boc.DateTime,
                refDate: boc.DateTime,
                age: number
            }> = [
                    {
                        birthDate: null,
                        refDate: new boc.DateTime('date', 1951, 1, 2),
                        age: 0,
                    },
                    {
                        birthDate: new boc.DateTime('date'),
                        refDate: new boc.DateTime('date', 1951, 1, 2),
                        age: 0,
                    },
                    {
                        birthDate: new boc.DateTime('date', 1950, 1, 2),
                        refDate: new boc.DateTime('date', 1951, 1, 2),
                        age: 1,
                    },
                    {
                        birthDate: new boc.DateTime('date', 1950, 1, 2),
                        refDate: new boc.DateTime('date', 1951, 1, 2),
                        age: 1,
                    },
                    {
                        birthDate: new boc.DateTime('date', 1950, 1, 2),
                        refDate: new boc.DateTime('date', 1951, 1, 1),
                        age: 0,
                    },
                    {
                        birthDate: new boc.DateTime('date', 1950, 1, 2),
                        refDate: new boc.DateTime('date', 1951, 1, 3),
                        age: 1,
                    },
                    {
                        birthDate: new boc.DateTime('date', 1950, 2, 2),
                        refDate: new boc.DateTime('date', 1951, 3, 3),
                        age: 1,
                    },
                    {
                        birthDate: new boc.DateTime('date', 1950, 2, 2),
                        refDate: new boc.DateTime('date', 1951, 1, 1),
                        age: 0,
                    },
                    {
                        birthDate: oneYearAgo,
                        refDate: null,
                        age: 1,
                    },
                    {
                        birthDate: oneYearAgo2,
                        refDate: null,
                        age: 0,
                    }
                ];
            for (const t of tests) {
                const actual = Helpers.getAge(t.birthDate, t.refDate);
                assert(actual === t.age, `test index: ${tests.indexOf(t)}`);
            }
        });
    });
});