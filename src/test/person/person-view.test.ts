import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { Person } from '../../lib/models/Person';
import { PersonView } from '../../lib/views/person/PersonView';
import { createContainer } from '../test-helpers';
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
        assert(view && !view.model);
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
        const todayDate = new Date();
        const birthDate = new boc.DateTime('date', todayDate).addYears(-personAge);
        await person.set_birthDate(birthDate);
        const view = await person.createViewModel<PersonView>(PersonView);
        assert(view.age === personAge);
        await person.set_birthDate(person.birthDate.addYears(1));
        assert(view.age === personAge - 1);
    });
    it('Should serialize person properties', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        const personAge = 5;
        const todayDate = new Date();
        const birthDate = new boc.DateTime('date', todayDate).addYears(-personAge);
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
        assert(data.personKey === person.id);
    });

});
