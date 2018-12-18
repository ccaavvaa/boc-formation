import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
import { Helpers } from '../helpers';
export const personNotEmptyProperties: Array<keyof Person & string> = [
    'personId', 'name', 'firstName', 'birthDate'];
export class PersonRules {
    @boc.PropChange({
        constr: Person,
        propName: personNotEmptyProperties,
        description: 'Empty value should immediate show error',
    })
    public static async notEmptyPropertyOnChange(target: Person, msg: boc.Message) {
        Helpers.checkEmptyProp(target, msg.body.propName);
    }

    @boc.Validate({
        constr: Person,
        description: 'Value should not be empty',
    })
    public static async notEmptyProperties(target: Person, msg: boc.Message) {
        for (const propName of personNotEmptyProperties) {
            Helpers.checkEmptyProp(target, propName);
        }
    }
    public static calculateAge(person: Person): number {
        return person ? Helpers.getAge(person.birthDate) : undefined;
    }
    public static calculateFullName(person: Person): string {
        const fullName = person ?
            [person.firstName, person.name].filter((s) => s).join(' ') :
            undefined;
        return fullName;
    }

    @boc.Link({
        constr: Person,
        propName: 'teamMembers'
    })
    public static linkMember(target: Person, msg: boc.Message) {
        const newMember = target.container.getInMemByRef<Person>(msg.data.opposite);
        console.log(newMember.name);
    }
    @boc.RoleChange({
        constr: Person,
        propName: 'teamMembers',
    })
    public static roleChange(target: Person, msg: boc.Message) {
       if(msg.kind === boc.MessageType.Link){
           // add
       } elseif(msg.kind === boc.MessageType.Unlink
            // remove
       }
    }

}