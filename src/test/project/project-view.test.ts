import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { createContainer, applyPatch } from '../test-helpers';
import { ProjectView } from '../../lib/views/project/ProjectView';
import { Person } from '../../lib/models/Person';
import { IJsonPatchOp, JsonPatchOperation } from '@phoenix/boc-interfaces';

// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('ProjectView', function () {
    it('simple', async function () {
        const c = createContainer();
        await createPersons(c);
        const p = await c.createNew<ProjectView>(ProjectView);
        assert(p.model.objectState === boc.ObjectState.New);
        await applyPatch(p, 'add', '/code', 'code');
        assert(p.model.code === 'code');
        await applyPatch(p, 'add', '/name', 'name');
        assert(p.model.name === 'name');
        await applyPatch(p, 'add', '/members/$links/$new', {});
        const currentMembersView = await p.members.toArray();
        assert(currentMembersView.length = 1);
        const memberView = currentMembersView[0];
        const member = memberView.model;
        assert(member);
        await applyPatch(p, 'add', `/members/${memberView.id}/role`, 'directeur');
        assert(member.role === 'directeur');
        await applyPatch(p, 'add', `/members/${memberView.id}/personId`, '0');
        assert(member.personId === '0');
        let data = await p.getAllData(null);
        assert(data.members[0].fullName === '0 0');
        await applyPatch(p, 'replace', `/members/${memberView.id}/personId`, '1');
        assert(member.personId === '1');
        data = await p.getAllData(null);
        assert(data.members[0].fullName === '1 1');
    });
});

async function createPersons(c: boc.Container): Promise<Person[]> {
    const persons: Person[] = [];
    for (let i = 0; i < 3; i++) {
        const n = i.toString();
        const p = await c.createNew<Person>(Person);
        await p.set_personId(n);
        await p.set_name(n);
        await p.set_firstName(n);
    }
    return persons;
}