import * as boc from '@phoenix/boc';
import { PersonExtension } from '../../views/person/PersonExtension';
import { PersonRules } from './PersonRules';
export class PersonExtensionRules {
    @boc.ObjectInit({
        constr: PersonExtension,
        isNew: true
    })
    public static async init(target: PersonExtension, msg: boc.Message) {
        await target.propState.fullName.set_isReadOnly(true);
        await target.propState.age.set_isReadOnly(true);
    }
    @boc.ModelChanged({
        constr: PersonExtension,
    })
    public static async calculateFullNameOnModelChanged(target: PersonExtension, msg: boc.Message) {
        this.calculateFullName(target);
        this.calculateAge(target);
    }

    @boc.PropChange({
        constr: PersonExtension,
        propName: ['name', 'firstName'],
        path: '#model',
    })
    public static async calculateFullName(target: PersonExtension) {
        const value = PersonRules.calculateFullName(target.model);
        await target.set_fullName(value);
    }

    @boc.PropChange({
        constr: PersonExtension,
        propName: 'birthDate',
        path: '#model',
    })
    public static async calculateAge(target: PersonExtension) {
        const value = PersonRules.calculateAge(target.model);
        await target.set_age(value);
    }
}