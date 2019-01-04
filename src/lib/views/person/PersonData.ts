/* tslint:disable */
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'Person Data View',
    primaryKey: ['id'],
    isTransient: true,
    findClass: 'Person',
    findPageSize: 5,
    findOptions: {
        count: true,
    },
})
export class PersonData extends boc.FindView {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Person Data View',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property personId
    @boc.PropertyInfo({
        jsFormats: ['code'],
        type: 'string',
        format: 'code',
        title: 'Person Data View',
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
        title: 'Person Data View',
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
        title: 'Person Data View',
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
        title: 'Person Data View',
    })
    public get birthDate(): boc.NZDate {
        return this.getProp('birthDate');
    }

    public set_birthDate(value: boc.NZDate): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('birthDate', value);
    }
}
