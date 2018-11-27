import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { Person } from '../../lib/models/Person';
import { createContainer } from '../test-helpers';
import { personNotEmptyProperties, PersonRules } from '../../lib/rules/person/PersonRules';
// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('Person', function () {
    it('personId, name, firstName, birthDate should not be empty', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.validate();
        assert(person.hasErrors);
        let propertyErrors: boc.IErrorInfo[];
        for (const p of personNotEmptyProperties) {
            propertyErrors = person.errors.errors.get(p);
            assert(propertyErrors && propertyErrors.length);
            const err = propertyErrors.find(
                (e) => e.error.srcId === 'PersonRules.notEmptyProperties'
            );
            assert(err);
            assert(err.error.message === c.t('Valeur obligatoire'));
            const value: any = p === 'birthDate' ?
                new boc.DateTime('date', 2018, 10, 10) : 'not empty';
            await person.setProp(p, value);
            await person.validate();
            propertyErrors = person.errors.errors.get(p);
            assert(!propertyErrors || !propertyErrors.find(
                (e) => e.error.srcId === 'PersonRules.notEmptyProperties')
            );
        }
    });
    it('personId, name, firstName, birthDate should not be empty on prop change',
        async function () {
            const c = createContainer();
            const person = await c.createNew<Person>(Person);
            for (const p of personNotEmptyProperties) {
                const value: any = p === 'birthDate' ?
                    new boc.DateTime('date', 2018, 10, 10) : 'not empty';
                await person.setProp(p, value);
                await person.setProp(p, null);
                assert(person.hasErrors);
                let propertyErrors: boc.IErrorInfo[];
                propertyErrors = person.errors.errors.get(p);
                assert(propertyErrors && propertyErrors.length);
                const err = propertyErrors.find(
                    (e) => e.error.srcId === 'PersonRules.notEmptyPropertyOnChange'
                );
                assert(err);
                assert(err.error.message === c.t('Valeur obligatoire'));

                await person.setProp(p, value);
                propertyErrors = person.errors.errors.get(p);
                assert(!propertyErrors || !propertyErrors.find(
                    (e) => e.error.srcId === 'PersonRules.notEmptyPropertyOnChange')
                );
            }
        });
    it('age is not defined', async function () {
        assert(PersonRules.calculateAge(null) === undefined);
    });
    it('calculate age', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const todayDate = new Date();
        const birthDate = new boc.DateTime('date', todayDate).addYears(-personAge).addDays(-2);
        await person.set_birthDate(birthDate);
        const age = PersonRules.calculateAge(person);
        assert(age === personAge);
    });
    it('calculate full name', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        let fullName: string;
        fullName = PersonRules.calculateFullName(null);
        assert(fullName === undefined);

        await person.set_name('Doe');
        fullName = PersonRules.calculateFullName(person);
        assert(fullName === 'Doe');

        await person.set_firstName('John');
        fullName = PersonRules.calculateFullName(person);
        assert(fullName === 'John Doe');
    });
});
