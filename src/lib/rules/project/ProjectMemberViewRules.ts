import * as boc from '@phoenix/boc';
import { ProjectMember } from '../../models/ProjectMember';
import { ProjectMemberView } from '../../views/project/ProjectMemberView';
import { Person } from '../../models/Person';

export class ProjectMemberViewRules {
    @boc.ModelChanged({
        constr: ProjectMemberView,
    })
    public static async modelChanged(target: ProjectMemberView, msg: boc.Message) {
        const personId = target.model ? target.model.personId : undefined;
        await target.set_personId(personId);
    }

    @boc.RoleChange({
        constr: ProjectMemberView,
        propName: 'person',
        path: '#model'
    })
    public static async personChanged(target: ProjectMemberView, msg: boc.Message) {
        const personId = target.model ? target.model.personId : undefined;
        await target.set_personId(personId);
    }
    @boc.PropChange({
        constr: ProjectMemberView,
        propName: 'personId',
    })
    public static async changePerson(target: ProjectMemberView, msg: boc.Message) {
        if (!target.model) {
            await target.set_personId(undefined);
            return;
        }
        const currentPersonId = target.model.personId;
        if (currentPersonId === target.personId) {
            return;
        }
        const c = target.container;
        const person = await c.getOne<Person>(Person, { personId: target.personId });
        if (!person) {
            await target.set_personId(currentPersonId);
            return;
        }
        await target.model.set_person(person);
    }
}