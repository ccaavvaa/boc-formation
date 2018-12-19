import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { Person } from '../../lib/models/Person';
import { PersonView } from '../../lib/views/person/PersonView';
import { createContainer } from '../test-helpers';
import { PersonRules } from '../../lib/rules/person/PersonRules';
// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('PersonView', function () {
    it('create with model ', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const view = await person.createViewModel<PersonView>(PersonView);
        assert(view && view.model === person);
    });
    it('create without model', async function () {
        const c = createContainer();
        const view = await c.createNew<PersonView>(PersonView);
        assert(view && !view.model);
    });
    it('create without model 2', async function () {
        const c = createContainer();
        const view = await c.createNew<PersonView>(PersonView, null, { notUsed: true });
        assert(view && view.model.objectState === boc.ObjectState.New);
    });
    it('create with model index', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const view =
            await c.createNew<PersonView>(PersonView, null, { id: person.id });
        assert(view && (view.model === person));
    });
    it('create with model ref', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const view =
            await c.createNew<PersonView>(PersonView, null, { personRef: person.$reference });
        assert(view && (view.model === person));
    });
    it('create with personId', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_personId('p1');
        const view =
            await c.createNew<PersonView>(PersonView, null, { personId: person.personId });
        assert(view && (view.model === person));
    });

    it('calculate age', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const birthDate = boc.NZDate.today().addYears(-personAge);
        await person.set_birthDate(birthDate);
        const view = await person.createViewModel<PersonView>(PersonView);
        let data: any;
        data = await view.getAllData(null);
        assert(data.age === personAge);
        await person.set_birthDate(person.birthDate.addYears(1));
        data = await view.getAllData(null);
        assert(data.age === personAge - 1);
    });
    it('calculate full name', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_name('Doe');
        await person.set_firstName('John');
        const view = await person.createViewModel<PersonView>(PersonView);
        let data: any;
        data = await view.getAllData(null, true);
        assert(data.fullName === PersonRules.calculateFullName(person));
        await person.set_name('Pepe');
        data = await view.getAllData(null, true);
        assert(data.fullName === PersonRules.calculateFullName(person));
    });
    it('Should serialize person properties', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const birthDate = boc.NZDate.today().addYears(-personAge);
        await person.set_birthDate(birthDate);
        await person.set_name('N');
        await person.set_firstName('F');
        await person.set_personId('P1');
        const view = await person.createViewModel<PersonView>(PersonView);
        const data = await view.getAllData(null, true);
        assert(data.id);
        assert(data.personId === person.personId);
        assert(data.name === person.name);
        assert(data.firstName === person.firstName);
        assert(data.birthDate === person.birthDate.toString());
        assert(data.age === personAge);
        assert(data.$states.age.isReadOnly);
        assert(data.$states.fullName.isReadOnly);
        assert(data.fullName === PersonRules.calculateFullName(person));
        assert(data.personKey === person.id);
    });
    it('Execute action remove', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const birthDate = boc.NZDate.today().addYears(-personAge);
        await person.set_birthDate(birthDate);
        await person.set_name('N');
        await person.set_firstName('F');
        await person.set_personId('P1');
        const view = await person.createViewModel<PersonView>(PersonView);
        await view.executeAction('remove');
        assert(person.isDeleted);
    });
});
