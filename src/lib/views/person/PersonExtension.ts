/* tslint:disable */
import * as boc from '@phoenix/boc';
import { Person } from '../../models/Person';
@boc.ClsInfo({
    title: 'PersonExtension',
    primaryKey: ['id'],
    businessKey: ['id'],
    modelConstr: Person,
    isTransient: true,
})
export class PersonExtension extends boc.ViewModel<Person> {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'PersonExtension',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property fullName
    @boc.PropertyInfo({
        type: 'string',
        title: 'Full Name',
    })
    public get fullName(): string {
        return this.getProp('fullName');
    }

    public set_fullName(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('fullName', value);
    }

    // read write property age
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'PersonExtension',
    })
    public get age(): number {
        return this.getProp('age');
    }

    public set_age(value: number): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('age', value);
    }
}
