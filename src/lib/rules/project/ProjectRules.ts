import * as boc from '@phoenix/boc';
import * as _ from 'lodash';
import { Project } from '../../models/Project';
import { Helpers } from '../helpers';
import { ProjectMember } from '../../models/ProjectMember';
import { Person } from '../../models/Person';
import { PersonRules } from '../person/PersonRules';
export const projectNotEmptyProperties: Array<keyof Project & string> = [
    'code', 'name',
];

export class ProjectRules {

    @boc.ObjectInit({
        constr: Project
    })
    public static async listenTodos(target: Project, msg: boc.Message) {
        target.todos.listen('todos');
    }
    @boc.ObjectInit({
        constr: Project
    })
    @boc.PropChange({
        constr: Project,
        path: 'todos',
        propName: 'progress',
    })
    @boc.RoleChange({
        constr: Project,
        propName: 'todos',
    })
    public static async setIsDone(target: Project, msg: boc.Message) {
        const todos = await target.todos.toArray();
        const isDone = !todos.length || !todos.find((todo) => todo.progress !== 100) ? true : false;
        await target.set_isDone(isDone);
    }

    @boc.Validate({
        constr: Project,
    })
    public static async notEmptyProperties(target: Project, msg: boc.Message) {
        for (const propName of projectNotEmptyProperties) {
            Helpers.checkEmptyProp(target, propName);
        }
    }

    @boc.Validate({
        constr: Project,
    })
    public static async membersOnlyOnce(target: Project, msg: boc.Message) {
        const c = target.container;
        const members = await target.members.toArray();
        const nullPersonId = 'nullPersonId';
        const counts = _.countBy(members, (m: ProjectMember) =>
            m.personId ? m.personId : nullPersonId);
        const personIds = Object.getOwnPropertyNames(counts)
            .filter((k) => k !== nullPersonId && counts[k] > 1);
        if (personIds.length) {
            const personNames: string[] = [];
            for (const personId of personIds) {
                const person = await c.getOne<Person>(Person, { personId });
                personNames.push(PersonRules.calculateFullName(person));
            }
            const error: string =
                c.t('Les membres suivants sont déclares plusieurs fois dans le projet.\n').concat(
                    personNames.join('\n')
                );
            target.errors.addError(error, 'members');
        }
    }

    public static getProjectName(p: Project): string {
        return p.name || p.code || p.id.toString();
    }
}
