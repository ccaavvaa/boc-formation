import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { createContainer } from '../test-helpers';
import { ProjectMember } from '../../lib/models/ProjectMember';
import { projectMemberNotEmptyProperties } from '../../lib/rules/project/ProjectMemberRules';
import { Person } from '../../lib/models/Person';
import { Project } from '../../lib/models/Project';
import { PersonRules } from '../../lib/rules/person/PersonRules';

// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('Project Member', function () {
    it('role should not be empty', async function () {
        const c = createContainer();
        const projectMember = await c.createNew<ProjectMember>(ProjectMember);
        await projectMember.validate();
        assert(projectMember.hasErrors);
        let propertyErrors: boc.IErrorInfo[];
        for (const p of projectMemberNotEmptyProperties) {
            propertyErrors = projectMember.errors.errors.get(p);
            assert(propertyErrors && propertyErrors.length);
            const err = propertyErrors.find(
                (e) => e.error.srcId === 'ProjectMemberRules.notEmptyProperties'
            );
            assert(err);
            assert(err.error.message === c.t('Valeur obligatoire'));
            const value = 'not empty';
            await projectMember.setProp(p, value);
            await projectMember.validate();
            propertyErrors = projectMember.errors.errors.get(p);
            assert(!propertyErrors || !propertyErrors.find(
                (e) => e.error.srcId === 'ProjectMemberRules.notEmptyProperties')
            );
        }
    });
    it('person should not be empty', async function () {
        const c = createContainer();
        const projectMember = await c.createNew<ProjectMember>(ProjectMember);
        await projectMember.validate();
        assert(projectMember.hasErrors);
        let propertyErrors: boc.IErrorInfo[];
        propertyErrors = projectMember.errors.errors.get('person');
        assert(propertyErrors && propertyErrors.length);
        const err = propertyErrors.find(
            (e) => e.error.srcId === 'ProjectMemberRules.checkPersonReference'
        );
        assert(err);
        assert(err.error.message === c.t('Valeur obligatoire'));
        const value = await c.createNew<Person>(Person);
        await projectMember.set_person(value);
        await projectMember.validate();
        propertyErrors = projectMember.errors.errors.get('person');
        assert(!propertyErrors || !propertyErrors.find(
            (e) => e.error.srcId === 'ProjectMemberRules.checkPersonReference')
        );
    });
    it('should block deleting referenced person', async function () {
        const c = createContainer();
        const project = await c.createNew<Project>(Project);
        await project.set_name('P1');
        const projectMember = await c.createNew<ProjectMember>(ProjectMember);
        await project.members.link(projectMember);

        const person = await c.createNew<Person>(Person);
        await person.set_name('J');
        await projectMember.set_person(person);
        await person.toDelete();
        assert(!person.isDeleted);
        const personErrors = person.errors.errors.get('$');
        assert(personErrors);
        const err = personErrors.find(
            (e) => e.error.srcId === 'ProjectMemberRules.doNotDeleteReferencedPerson'
        );
        assert(err);
        assert(err.error.isTransient);
        const expectedMessage =
            c.t('{{0}} participe dans les projets suivants:\n',
                PersonRules.calculateFullName(person))
                .concat('P1');
        assert(err.error.message === expectedMessage);
    });
});