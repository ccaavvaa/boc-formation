import * as boc from '@phoenix/boc';
import 'mocha';
import * as chai from 'chai';
import '../debug-test';
import { createContainer } from '../test-helpers';
import { Project } from '../../lib/models/Project';
import {
    projectNotEmptyProperties, ProjectRules
} from '../../lib/rules/project/ProjectRules';
import { Person } from '../../lib/models/Person';
import { ProjectMember } from '../../lib/models/ProjectMember';
// tslint:disable:only-arrow-functions

const assert = chai.assert;

describe('Project', function () {
    it('code, name should not be empty', async function () {
        const c = createContainer();
        const project = await c.createNew<Project>(Project);
        await project.validate();
        assert(project.hasErrors);
        let propertyErrors: boc.IErrorInfo[];
        for (const p of projectNotEmptyProperties) {
            propertyErrors = project.errors.errors.get(p);
            assert(propertyErrors && propertyErrors.length);
            const err = propertyErrors.find(
                (e) => e.error.srcId === 'ProjectRules.notEmptyProperties'
            );
            assert(err);
            assert(err.error.message === c.t('Valeur obligatoire'));
            const value = 'not empty';
            await project.setProp(p, value);
            await project.validate();
            propertyErrors = project.errors.errors.get(p);
            assert(!propertyErrors || !propertyErrors.find(
                (e) => e.error.srcId === 'ProjectRules.notEmptyProperties')
            );
        }
    });

    it('members only once', async function () {
        const c = createContainer();
        const project = await c.createNew<Project>(Project);
        const persons: Person[] = [];
        for (let i = 0; i < 2; i++) {
            const person = await c.createNew<Person>(Person);
            const n = i.toString();
            await person.set_personId(n);
            await person.set_name(n);
            await person.set_firstName(n);

            const projectMember = await c.createNew<ProjectMember>(ProjectMember);
            await projectMember.set_person(person);
            await projectMember.set_role('dev');
            await project.members.link(projectMember);
            persons.push(person);
        }
        const projectMembers = await project.members.toArray();
        assert(projectMembers.length === 2);
        project.members.link(await c.createNew<ProjectMember>(ProjectMember));
        const m = await c.createNew<ProjectMember>(ProjectMember);
        await m.set_person(persons[0]);
        await m.set_role('dev');
        await project.members.link(m);
        await project.validate();
        assert(project.hasErrors);
        let membersErrors = project.errors.errors.get('members');
        assert(membersErrors && membersErrors.length);
        const err = membersErrors.find(
            (e) => e.error.srcId === 'ProjectRules.membersOnlyOnce'
        );
        assert(
            err &&
            err.error.message ===
            c.t('Les membres suivants sont déclares plusieurs fois dans le projet.\n').concat('0 0')
        );

        await project.members.unlink(m);
        await project.validate();
        membersErrors = project.errors.errors.get('members');
        assert(
            !membersErrors
            || !membersErrors.length
            || !membersErrors.find(
                (e) => e.error.srcId === 'ProjectRules.membersOnlyOnce'
            )
        );
    });
    it('calculate project name', async function () {
        const c = createContainer();
        const project = await c.createNew<Project>(Project);
        let v: string = ProjectRules.getProjectName(project);
        assert(v);
        await project.set_code('c');
        v = ProjectRules.getProjectName(project);
        assert(v === project.code);
        await project.set_name('n');
        v = ProjectRules.getProjectName(project);
        assert(v === project.name);
    });
});
