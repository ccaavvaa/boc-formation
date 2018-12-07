/* tslint:disable */
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'Person',
    primaryKey: ['id'],
    businessKey: ['personId'],
    objectStoreSource: 'Basic',
    metadata: 'Basic',
})
export class Person extends boc.ModelObject {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
            // relation teamMembers
            {
                constr: boc.Many,
                settings: {
                    roleProp: 'teamMembers',
                    oppositeConstr: Person,
                    key: ['id'],
                    oppositeKey: ['refManager'],
                    oppositeRoleProp: 'manager',
                }
            },
            // relation manager
            {
                constr: boc.Reference,
                settings: {
                    roleProp: 'manager',
                    oppositeConstr: Person,
                    key: ['refManager'],
                    oppositeKey: ['id'],
                    oppositeRoleProp: 'teamMembers',
                }
            },
        ];
    }

    // read only property refManager
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Person',
    })
    public get refManager(): number {
        return this.getProp('refManager');
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Person',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property personId
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'Person',
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    public set_personId(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('personId', value);
    }

    // read write property name
    @boc.PropertyInfo({
        type: 'string',
        title: 'Person',
    })
    public get name(): string {
        return this.getProp('name');
    }

    public set_name(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('name', value);
    }

    // read write property firstName
    @boc.PropertyInfo({
        type: 'string',
        title: 'Person',
    })
    public get firstName(): string {
        return this.getProp('firstName');
    }

    public set_firstName(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('firstName', value);
    }

    // read write property birthDate
    @boc.PropertyInfo({
        jsFormats: ['date'],
        type: 'string',
        format: 'date',
        title: 'Person',
    })
    public get birthDate(): boc.NZDate {
        return this.getProp('birthDate');
    }

    public set_birthDate(value: boc.NZDate): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('birthDate', value);
    }

    // relation teamMembers
    public teamMembers: boc.Many<Person, Person>;

    // relation manager
    public manager(): Promise<Person> {
        return this.getRoleProp('manager');
    }

    public set_manager(value: Person): Promise<boc.IRuleExecutionResult[]> {
        return this.setRoleProp('manager', value);
    }
}
