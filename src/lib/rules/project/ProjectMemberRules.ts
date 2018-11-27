import * as boc from '@phoenix/boc';
import { ProjectMember } from '../../models/ProjectMember';
import { Helpers } from '../helpers';
import { Person } from '../../models/Person';
import { PersonRules } from '../person/PersonRules';
import { ProjectRules } from './ProjectRules';

export const projectMemberNotEmptyProperties: Array<keyof ProjectMember & string> = [
    'role',
];
export class ProjectMemberRules {

    @boc.Validate({
        constr: ProjectMember
    })
    public static notEmptyProperties(target: ProjectMember, msg: boc.Message) {
        for (const propName of projectMemberNotEmptyProperties) {
            Helpers.checkEmptyProp(target, propName);
        }
    }
    @boc.Deleting({
        constr: Person
    })
    public static async doNotDeleteReferencedPerson(target: Person, msg: boc.Message) {
        const c = target.container;
        const projectMembers =
            await c.getMany<ProjectMember>(ProjectMember, { personId: target.personId });

        /* istanbul ignore else */
        if (projectMembers.length) {
            const projects: string[] = [];
            for (const m of projectMembers) {
                const project = await m.parentObject();
                projects.push(ProjectRules.getProjectName(project));
            }
            const err =
                c.t('{{0}} participe dans les projets suivants:\n',
                    PersonRules.calculateFullName(target))
                    .concat(
                        projects.join('\n')
                    );
            throw new boc.BOErr(500, err);
        }
    }

    @boc.Validate({
        constr: ProjectMember
    })
    public static async checkPersonReference(target: ProjectMember, msg: boc.Message) {
        const c = target.container;
        const p = await target.person();
        if (!p) {
            target.errors.addError(c.t('Valeur obligatoire'), 'person');
        }
    }
}