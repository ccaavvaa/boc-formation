/* tslint:disable */
import * as boc from '@phoenix/boc';
@boc.ClsInfo({
    title: 'Lookup View',
    primaryKey: ['id'],
    isTransient: true,
})
export class LookupView extends boc.BaseViewModel {
    public static defineRoles(): boc.IRoleDeclaration[] {
        return [
        ];
    }

    // read only property id
    @boc.PropertyInfo({
        jsFormats: ['integer'],
        type: 'integer',
        title: 'Lookup View',
    })
    public get id(): number {
        return this.getProp('id');
    }

    // read write property personId
    @boc.PropertyInfo({
        type: 'string',
        title: 'Person ID',
    })
    public get personId(): string {
        return this.getProp('personId');
    }

    public set_personId(value: string): Promise<boc.IRuleExecutionResult[]> {
        return this.setProp('personId', value);
    }
}
