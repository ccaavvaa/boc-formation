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
        const age = person.mappings.extension.age;
        assert(age === personAge);
    });
    it('calculate full name', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        let fullName: string;
        fullName = person.mappings.extension.fullName;
        assert(fullName === PersonRules.calculateFullName(person));

        await person.set_name('Doe');
        fullName = person.mappings.extension.fullName;
        assert(fullName === PersonRules.calculateFullName(person));

        await person.set_firstName('John');
        fullName = person.mappings.extension.fullName;
        assert(fullName === PersonRules.calculateFullName(person));
    });

    it('isManager', async function () {
        const c = createContainer();
        const persons: Person[] = [];
        for (let i = 0; i < 3; i++) {
            const n = i.toString();
            const person = await c.createNew<Person>(Person);
            await person.set_personId(n);
            await person.set_name(n);
            if (persons.length) {
                await person.set_manager(persons[persons.length - 1]);
            }
            persons.push(person);
        }
        assert(!await PersonRules.isManager(null, null));
        assert(!await PersonRules.isManager(persons[0], null));
        assert(!await PersonRules.isManager(null, persons[0]));
        assert(!await PersonRules.isManager(persons[1], persons[0]));
        assert(!await PersonRules.isManager(persons[2], persons[0]));
        assert(!await PersonRules.isManager(persons[2], persons[1]));
        assert(await PersonRules.isManager(persons[0], persons[1]));
        assert(await PersonRules.isManager(persons[0], persons[2]));
        assert(await PersonRules.isManager(persons[1], persons[2]));
    });
    it('circular refs 1', async function () {
        const createPersons = async (cnt: number): Promise<Person[]> => {
            const c = createContainer();
            const result: Person[] = [];
            for (let i = 0; i < cnt; i++) {
                const n = i.toString();
                const person = await c.createNew<Person>(Person);
                await person.set_personId(n);
                await person.set_name(n);
                result.push(person);
            }
            return result;
        };

        let persons: Person[];
        persons = await createPersons(1);
        let p: Person;
        p = persons[0];
        await p.set_manager(p);
        try {
            await PersonRules.checkCircularManager(p, null);
            assert(false);
        } catch (e) {
            assert(e);
        }

        persons = await createPersons(3);
        await persons[0].set_manager(persons[1]);
        await persons[1].set_manager(persons[2]);
        await persons[2].set_manager(persons[0]);
        for (p of persons) {
            try {
                await PersonRules.checkCircularManager(p, null);
                assert(false);
            } catch (e) {
                assert(e);
            }
        }
    });
    it('circular refs 2', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_personId('1');
        await person.set_name('1');
        await person.set_manager(person);
        await person.validate();
        assert(person.hasErrors);
        const err = person.errors.errors.get('$').find(
            (e) => e.error.srcId === 'PersonRules.checkCircularManager'
        );
        assert(err);
        assert(err.error.message === c.t('Réference circulaire {{0}}, {{1}}', '1', '1'));
    });

});
