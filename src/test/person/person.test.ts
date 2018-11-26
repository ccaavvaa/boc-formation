import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { ViewServer } from '../../lib/view-server';
import { Person } from '../../lib/models/Person';
// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('Person', function () {
    it('personId should not be empty', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.validate();
        assert(person.hasErrors);
        let personIdErrors: boc.IErrorInfo[];
        personIdErrors = person.errors.errors.get('personId');
        assert(personIdErrors && personIdErrors.length);
        const err = personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonId'
        );
        assert(err);
        assert(err.error.message === c.t("L'id de la personne est vide"));

        await person.set_personId('not empty');
        await person.validate();
        personIdErrors = person.errors.errors.get('personId');
        assert(!personIdErrors || !personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonId')
        );
    });
    it('personId should not be empty on personId prop change', async function () {
        const c = createContainer();
        const person = await c.createNew<Person>(Person);
        await person.set_personId('not empty');
        await person.set_personId(null);
        assert(person.hasErrors);
        let personIdErrors: boc.IErrorInfo[];
        personIdErrors = person.errors.errors.get('personId');
        assert(personIdErrors && personIdErrors.length);
        const err = personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonIdOnChange'
        );
        assert(err);
        assert(err.error.message === c.t("L'id de la personne est vide"));

        await person.set_personId('not empty');
        personIdErrors = person.errors.errors.get('personId');
        assert(!personIdErrors || !personIdErrors.find(
            (e) => e.error.srcId === 'PersonRules.notEmptyPersonId')
        );
    });
});

const server = new ViewServer();
const session = server.createSession('IDSESSION');
function createContainer() {
    const container = session.createContainerFor('Basic');
    return container;
}