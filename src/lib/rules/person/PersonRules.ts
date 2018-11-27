import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
import { Helpers } from '../helpers';
import * as _ from 'lodash';
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
    @boc.Validate({
        constr: Person,
        description: 'CircularReferences',
    })
    public static async checkCircularManager(target: Person, msg: boc.Message) {
        const c = target.container;
        const manager = await target.manager();
        const errors: string[] = [];
        const addError = (m: Person, n: Person) => {
            errors.push(c.t('Réference circulaire {{0}}, {{1}}',
                this.calculateFullName(m),
                this.calculateFullName(n)));
        };
        if (manager && (manager === target || this.isManager(target, manager))) {
            addError(target, manager);
        }

        const teamMembers = await target.teamMembers.toArray();
        for (const member of teamMembers) {
            /* istanbul ignore else */
            if (this.isManager(member, target)) {
                addError(member, target);
            }
        }
        if (errors.length) {
            const message = _.uniq(errors).join('\n');
            throw new boc.BOErr(500, message);
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
    public static async isManager(manager: Person, person: Person): Promise<boolean> {
        if (!person || !manager) {
            return false;
        }
        const m = await person.manager();
        if (!m) {
            return false;
        }
        if (m === manager) {
            return true;
        }
        return this.isManager(manager, m);
    }

}