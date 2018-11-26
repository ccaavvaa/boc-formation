import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
export class PersonRules {
    @boc.PropChange({
        constr: Person,
        propName: 'personId',
        description: 'Empty personId should immediate show error',
    })
    public static async notEmptyPersonIdOnChange(target: Person, msg: boc.Message) {
        this.checkPersonId(target);
    }

    @boc.Validate({
        constr: Person,
        description: 'personId should not be empty',
    })
    public static async notEmptyPersonId(target: Person, msg: boc.Message) {
        this.checkPersonId(target);
    }

    private static checkPersonId(person: Person) {
        const c = person.container;
        if (!person.personId) {
            person.errors.addError(c.t("L'id de la personne est vide"), 'personId');
        }
    }
}